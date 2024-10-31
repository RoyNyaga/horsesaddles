import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import supabase from '../../supabase';

const OrderShowPage = () => {
  const location = useLocation();
  const order = location.state?.order || {}; 
  const [products, setProducts] = useState([])

  const productIds = useCallback(() => {
    return order.product_ids?.map(item => item.split("-")[0]) || [];
  }, [order.product_ids]);

  const getProducts = useCallback(async () => {
    const { data: products, error } = await supabase
      .from('product_horsesaddle')
      .select("*")
      .in('id', productIds());

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(products || []);
    }
  }, [productIds]);

  useEffect(() => {
    if (order.product_ids) {
      getProducts();
    }
  }, [getProducts, order.product_ids]);

  const quantity = (product) => {
    return order.product_ids.filter((i) => i.split("-")[0] === `${product.id}`)[0].split("-")[1]
  }
  console.log("order", order.shipping_state)
  return (
    <div className='container'>
      <h1 className='my-5 text-center'>Order Info</h1>
      <span className='badge'></span>
      <p>Shipping Status: <span className="badge bg-info text-dark">{order.shipping_state}</span></p>
      <div>
        <div className="pb-20">
          <div>
            <table className="table w-100">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Unit price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => {
                  return <tr key={product.id}>
                    <th scope="row">{product.name}</th>
                    <td>${product.price}</td>
                    <td>{quantity(product)}</td>
                    <td>${parseInt(quantity(product)) * product.price}</td>
                  </tr>
                })}
                <tr>
                  <th scope="row">Cost of Products</th>
                  <td></td>
                  <td></td>
                  <td>${order.amount}</td>
                </tr>
                <tr>
                  <th scope="row">Delivery Fee</th>
                  <td></td>
                  <td></td>
                  <td>${order.delivery_fee}</td>
                </tr>
                <tr>
                  <th scope="row">Total</th>
                  <td></td>
                  <td></td>
                  <td>${order.total_amount}</td>
                </tr>
              </tbody>
            </table>



          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderShowPage;
