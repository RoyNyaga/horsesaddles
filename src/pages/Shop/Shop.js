import React, { useEffect, useState } from "react";
import Product from "../../components/home/Products/Product";
import supabase from "../../supabase";


const Shop = () => {
  const [products, setProducts] = useState([])
  const getProducts = async () => {
    let { data: product_horsesaddle } = await supabase
      .from('product_horsesaddle')
      .select('*')
      console.log(product_horsesaddle)
      setProducts(product_horsesaddle)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="max-w-container mx-auto px-4">
    <div className='row'>
    {products.map((product) => {
      return <div key={product.id} className="col-md-4 my-2">
        <Product
          id={product.id}
          img={product.img_url}
          productName={product.name}
          price={product.price}
          color={product.color}
          badge={product.has_badge}
          des={product.description}
          dHoverDetails={true}
          isAdmin={true}
        />
      </div>
    })}
    </div>
    </div>
  );
};

export default Shop;
