import React, { useCallback, useEffect, useState } from 'react'
import supabase from '../../supabase';
import OrderCard from './components/orderCard';

 const OrderList = () => {
  const [orders, setOrders] = useState([])
  const getOrders = useCallback(async () => {
    let { data: usersOrders, error } = await supabase
      .from('order_horsesaddle')
      .select("*")

    if (error) {
      console.error("Error fetching profile:", error.message);
      return;
    }

    if (usersOrders && usersOrders.length > 0) {
      setOrders(usersOrders);
    } else {
      console.warn("something is not right");
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);
  return (
    <div className='container'>
      <h1 className='text-center bold my-5'>All Orders</h1>
      <div className='row'>
        <div className='col-md-6 mx-auto my-4'>
        { orders.length > 0 && orders.map(order => { return <OrderCard key={order.id} order={order} />})}

        </div>
      </div>
    </div>
  )
}

export default OrderList
