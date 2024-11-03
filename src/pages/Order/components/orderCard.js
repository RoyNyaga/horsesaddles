import React from 'react'
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const linkToOrderShowPage = () => {
    navigate(`/orders/${order.id}`, {
      state: {
        order: order,
      },
    });
  };
  const getTotalQuantity = (productIdAndQuantity) => {
    return productIdAndQuantity.reduce((total, item) => {
      const quantity = parseInt(item.split("-")[1], 10); // Extract and parse quantity
      return total + quantity;
    }, 0);
  }

  return (
    <div className='border p-3'>
      <div onClick={linkToOrderShowPage}>
        <p className='d-flex justify-content-between'><span>Planced on: </span> <span>{order.created_at}</span></p>
        <p className='d-flex justify-content-between'><span>Number of items: </span><span>{getTotalQuantity(order.product_ids)}</span></p>
        <p className='d-flex justify-content-between'><span>Delivery fee: </span><span>${order.delivery_fee}</span></p>
        <p className='d-flex justify-content-between'><span>Product cost: </span> <span>${order.amount}</span></p>
        <p className='d-flex justify-content-between'><span>Total cost: </span><span>${order.total_amount}</span></p>
      </div>
    </div>
  )
}

export default OrderCard
