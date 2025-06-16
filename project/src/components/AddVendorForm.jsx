import React, { useState } from 'react';
import axios from 'axios';

const AddVendorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    upiId: '',
    location: '',
    isVerified: false,
    cartStatus: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/vendors', formData);
      alert('Vendor added successfully!');
      setFormData({ name: '', upiId: '', location: '', isVerified: false, cartStatus: '' });
    } catch (err) {
      alert('Error: ' + err.response?.data?.error || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Vendor</h2>
      <input className="w-full mb-2 p-2 border" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input className="w-full mb-2 p-2 border" name="upiId" placeholder="UPI ID" value={formData.upiId} onChange={handleChange} required />
      <input className="w-full mb-2 p-2 border" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
      <input className="w-full mb-2 p-2 border" name="cartStatus" placeholder="Cart Status" value={formData.cartStatus} onChange={handleChange} />
      <label className="flex items-center mb-2">
        <input type="checkbox" name="isVerified" checked={formData.isVerified} onChange={handleChange} />
        <span className="ml-2">Verified</span>
      </label>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default AddVendorForm;
