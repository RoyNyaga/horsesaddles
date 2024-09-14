import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { missingImage } from '../../assets/images';
import supabase from '../../supabase';
import ProductForm from './form';

const EditProductPage = () => {
  const [product, setProduct] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [showSaveBtn, setShowSaveBtn] = useState(true)
  const { id } = useParams();

  const generateRandomStrings = () => {
    const randomStrings = [];

    for (let i = 0; i < 10; i++) {
      let randomString = '';

      for (let j = 0; j < 10; j++) {  // Generating a string of 10 random digits
        randomString += Math.floor(Math.random() * 10);  // Generates a random digit (0-9)
      }

      randomStrings.push(randomString);
    }

    return randomStrings;
  }

  const getProduct = async () => {
    let { data: product_horsesaddle, error } = await supabase
      .from('product_horsesaddle')
      .select("*")
      // Filters
      .eq('id', id)
    setProduct(product_horsesaddle[0])
  }

  const updateProduct = async (img_url, img_id) => {
    const { data, error } = await supabase
      .from('product_horsesaddle')
      .update({ img_url, img_id })
      .eq('id', id)
      .select()
    console.log({ data })
    setProduct(data[0])
  }

  useEffect(() => {
    getProduct()
  }, []);

  const handleSubmitPhotoForm = async (event) => {
    event.preventDefault();
    setShowSaveBtn(false)
    setShowSaveBtn(false)

    const photoInputField = document.querySelector("#photo-input")
    const productPhoto = photoInputField.files[0]
    const photoName = productPhoto.name + "-" + generateRandomStrings()

    const { data: photoObject, error } = await supabase
      .storage
      .from('general-ideas')
      .upload(`public/${photoName}`, productPhoto, {
        cacheControl: '3600',
        upsert: false
      })

    if (!error) {
      const { data: publicUrl } = supabase
        .storage
        .from('general-ideas')
        .getPublicUrl(`public/${photoName}`)
      console.log("this is publicUrl", publicUrl.publicUrl)
      updateProduct(publicUrl.publicUrl, photoObject.id)
      setShowSaveBtn(true)
      setShowSaveBtn(true)

    } else {
      console.log(error)
    }
  }

  return (
    <div className='container'>
      <h1 className='text-center my-4'>Edit this product {id} </h1>
      <div className='row'>
        <div className='col-md-3'>
          {product.img_url ? <img className="w-full" src={product.img_url} alt="missing photo" />
            : <img className="w-full" src={missingImage} alt="missing photo" />}
          <br />
          {!showForm ?
            <button onClick={() => { setShowForm(true) }} className='btn btn-secondary'>Change Photo</button>
            :
            <button onClick={() => { setShowForm(false) }} className='btn btn-danger'>Cancel</button>
          }
          <br />
          <br />

          {showForm &&
            <form onSubmit={handleSubmitPhotoForm}>
              <input type="file" name="photo" id="photo-input" />
              {!showSaveBtn &&
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              }
              <br />
              <br />

              {showSaveBtn && <button className='btn btn-primary' id="photo-save-btn">Save Changes</button>}
            </form>
          }
        </div>
        <div className='col-md-9'>
          <ProductForm product={product} type="update" />
        </div>
      </div>
    </div>
  )
}

export default EditProductPage;
