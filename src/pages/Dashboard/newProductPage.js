import React from 'react'
import ProductForm from './form';

const NewProductPage = () => {
  return (
    <div className='container'>
      <h1 className='text-center my-4'>Add A New Product</h1>
      <div className='row'>
        <div className='col-md-5 mx-auto'>
          <ProductForm />
        </div>
      </div>
    </div>
  )
}

export default NewProductPage;
