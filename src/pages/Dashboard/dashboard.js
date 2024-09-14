import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Product from '../../components/home/Products/Product';
import supabase from '../../supabase';
import ProductForm from './form';

const Dashboard = () => {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    let { data: product_horsesaddle, error } = await supabase
      .from('product_horsesaddle')
      .select('*')
      setProducts(product_horsesaddle)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="container">
      <div className='row'>
        <div className='col-md-2 p-2 text-center'>
          <Link to="/dashboard/products/new" className='btn btn-secondary'>New Product</Link>
        </div>
        <div className='col-md-8'>
          <div className='row'>
          {products.map((product) => {
            return <div key={product.id} className="col-md-4 my-2">
              <Product
                id={product.id}
                img={product.img_url}
                productName={product.name}
                price={product.price}
                color={product.color}
                badge={true}
                des={product.description}
                dHoverDetails={false}
                isAdmin={true}
              />
            </div>
          })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
