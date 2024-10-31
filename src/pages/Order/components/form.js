import React, { useState } from 'react'
import supabase from '../../../supabase';

const Form = ({ profile, product_ids }) => {
  const url = new URL(window.location.href);
  const amount = url.searchParams.get("amount");        // "400"
  const deliveryFee = url.searchParams.get("deliver_fee"); // "25"

  const [formData, setFormData] = useState({
    country: profile.country,
    state: '',
    city: profile.city,
    postal_code: profile.postal_code,
    address: profile.address,
    shipping_state: 'IN-PROGRESS',
    product_ids: product_ids,
    email_address: profile.email,
    country_code: '',
    phone_number: profile.phone_number,
    full_name: profile.full_name,
    amount: parseInt(amount),
    delivery_fee: parseInt(deliveryFee),
    total_amount: parseInt(amount) + parseInt(deliveryFee),
    profile_horsesadle_id: profile.id,

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data", formData)
    const { data, error } = await supabase.from('order_horsesaddle').insert([formData]);
    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      console.log('Data inserted successfully:', data);
      alert('Order placed successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4 border">
      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input type="text" name="full_name" className="form-control" value={formData.country} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Country Code</label>
        <input type="text" name="country_code" className="form-control" value={formData.country_code} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Country</label>
        <input type="text" name="country" className="form-control" value={formData.country} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Email Address</label>
        <input type="email" name="email_address" className="form-control" value={formData.email_address} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Phone Number</label>
        <input type="text" name="phone_number" className="form-control" value={formData.phone_number} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">State</label>
        <input type="text" name="state" className="form-control" value={formData.state} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">City</label>
        <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Postal Code</label>
        <input type="text" name="postal_code" className="form-control" value={formData.postal_code} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Address</label>
        <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-secondary">Place Order</button>
    </form>
  );
}

export default Form;
