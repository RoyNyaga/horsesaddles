import React, { useState } from 'react'
import supabase from '../../supabase';

const FormProfile = ({ profile }) => {
  const [formData, setFormData] = useState({
    id: profile.id,
    full_name: profile.full_name,
    email: profile.email,
    phone_number: profile.phone_number,
    address: profile.address,
    city: profile.city,
    country: profile.country,
    postal_code: profile.postal_code
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('profile_horsesadle')
      .update(formData)
      .eq('id', profile.id)
      .select()
    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      console.log('Data inserted successfully:', data);
      alert('Profile saved successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4 border my-4 py-4">
      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input type="text" name="full_name" className="form-control" value={formData.full_name} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Phone Number</label>
        <input type="text" name="phone_number" className="form-control" value={formData.phone_number} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Address</label>
        <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">City</label>
        <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Country</label>
        <input type="text" name="country" className="form-control" value={formData.country} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Postal Code</label>
        <input type="text" name="postal_code" className="form-control" value={formData.postal_code} onChange={handleChange} required />
      </div>

      <button type="submit" className="btn btn-secondary">Save Profile</button>
    </form>
  );
}

export default FormProfile;
