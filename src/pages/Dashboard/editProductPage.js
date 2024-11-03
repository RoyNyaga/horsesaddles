import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import supabase from '../../supabase';
import AddPhotoForm from './components/photoAddForm';
import ProductCarousel from './components/productCarousel';
import ProductForm from './form';

const EditProductPage = () => {
  const [product, setProduct] = useState({})
  const { id } = useParams();

  const updateProduct = async (img_url, img_id) => {
    const images_urls = product.images_urls ? product.images_urls : []
    images_urls.push(img_url)
    const { data } = await supabase
      .from('product_horsesaddle')
      .update({ img_url, img_id, images_urls })
      .eq('id', id)
      .select()
    console.log({ data })
    setProduct(data[0])
  }

  const getProduct = useCallback(async () => {
    let { data: product_horsesaddle } = await supabase
      .from('product_horsesaddle')
      .select("*")
      // Filters
      .eq('id', id)
    setProduct(product_horsesaddle[0])
  }, [id]);

  useEffect(() => {
    getProduct()
  }, [getProduct]);

  return (
    <div className='container'>
      <h1 className='text-center my-4'>Edit this product {id} </h1>
      <div className='row'>
        <div className='col-md-3'>
          <ProductCarousel images_urls={product.images_urls}/>
          <div>
            <AddPhotoForm updateProduct={updateProduct}/>
          </div>
        </div>
        <div className='col-md-9'>
          <ProductForm product={product} type="update" />
        </div>
      </div>
    </div>
  )
}

export default EditProductPage;
