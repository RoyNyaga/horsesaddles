
import React, { useEffect, useState } from "react";
import supabase from "../../supabase";
import { useNavigate } from "react-router-dom";



const ProductForm = ({ product = {}, type = "create" }) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const createProduct = async (payload) => {
    const { data, error } = await supabase
      .from('product_horsesaddle')
      .insert([
        payload,
      ])
      .select()
    if (!error) {
      navigate(`/dashboard/products/${data[0].id}/edit`);
    } else {
      console.log({ error })
    }
  }

  const updateProduct = async (payload) => {
    setLoading(true)
    const { data, error } = await supabase
      .from('product_horsesaddle')
      .update([
        payload,
      ])
      .eq('id', product.id)
      .select()
    if (!error) {
      console.log({ data })
      setLoading(false)
    } else {
      console.log({ error })
      setLoading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      price: formData.get("price"),
      price_2: formData.get("price_2"),
      color: formData.get("color"),
      material: formData.get("material"),
      description: formData.get("description"),
    }
    console.log({ payload })
    if (type === "create") {
      createProduct(payload)
    } else {
      updateProduct(payload)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-3">
        <label>Name</label>
        <input type="text" name="name" className="form-control" defaultValue={product.name} required />
      </div>
      <div className="my-3">
        <label>Price</label>
        <input type="text" name="price" className="form-control" defaultValue={product.price} required />
      </div>
      <div className="my-3">
        <label>Price 2</label>
        <input type="text" name="price_2" className="form-control" defaultValue={product.price_2} />
      </div>
      <div className="my-3">
        <label>Color</label>
        <input type="text" name="color" className="form-control" defaultValue={product.color} />
      </div>
      <div className="my-3">
        <label>Material</label>
        <input type="text" name="material" className="form-control" defaultValue={product.material} required />
      </div>
      <div className="my-3">
        <input type="checkbox" name="has_badge"
          value="true"
          defaultChecked={product.has_badge}></input>
        <label className="mx-3">Has new arrival badge?</label>
      </div>
      <div className="my-3">
        <label>Description</label>
        <input type="text" name="description" className="form-control" defaultValue={product.description} required />
      </div>

      {loading ?
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        :
        <div className="my-3">
          <button className="btn btn-secondary">Save</button>
        </div>
      }
    </form>
  )
}


export default ProductForm;


