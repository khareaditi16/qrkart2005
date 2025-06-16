import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const AllVendors = () => {

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingVendorId, setEditingVendorId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    upiId: '',
    location: '',
    isVerified: false,
    cartStatus: '',
  });

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/vendor/all'); // ✅ FIXED endpoint
      setVendors(res.data);
    } catch (err) {
      toast.error('Failed to fetch vendors 😢');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this vendor?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/vendor/${id}`);
      toast.success('Vendor deleted ✅');
      fetchVendors();
    } catch (err) {
      toast.error('Error deleting vendor ❌');
    }
  };

  const startEditing = (vendor) => {
    setEditingVendorId(vendor._id);
    setEditForm({
      name: vendor.name,
      upiId: vendor.upiId,
      location: vendor.location,
      isVerified: vendor.isVerified,
      cartStatus: vendor.cartStatus,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditSave = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/vendor/${id}`, editForm);
      toast.success('Vendor updated ✨');
      setEditingVendorId(null);
      fetchVendors();
    } catch (err) {
      toast.error('Error updating vendor ❌');
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Registered Vendors 📋 <span className="text-blue-600">({vendors.length})</span>
        </h2>
        <Link to="/add-vendor">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
            ➕ Add Vendor
          </button>
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading vendors...</p>
      ) : vendors.length === 0 ? (
        <p className="text-center text-gray-500">No vendors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor, index) => (
            <motion.div
              key={vendor._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white border rounded-xl shadow hover:shadow-md transition relative"
            >
              {editingVendorId === vendor._id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    placeholder="Name"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="upiId"
                    value={editForm.upiId}
                    onChange={handleEditChange}
                    placeholder="UPI ID"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="location"
                    value={editForm.location}
                    onChange={handleEditChange}
                    placeholder="Location"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="cartStatus"
                    value={editForm.cartStatus}
                    onChange={handleEditChange}
                    placeholder="Cart Status"
                    className="w-full p-2 border rounded"
                  />
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isVerified"
                      checked={editForm.isVerified}
                      onChange={handleEditChange}
                    />
                    <span className="ml-2">Verified</span>
                  </label>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEditSave(vendor._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingVendorId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-gray-800">{vendor.name}</h3>
                  <p className="text-gray-600">📍 Location: {vendor.location}</p>
                  <p className="text-gray-600">🛒 Cart: {vendor.cartStatus}</p>
                  <p className="text-gray-600">💳 UPI: {vendor.upiId}</p>
                  <p className="mt-1">
                    Status:
                    <span
                      className={`ml-2 font-semibold ${
                        vendor.isVerified ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {vendor.isVerified ? 'Verified ✅' : 'Unverified ❌'}
                    </span>
                  </p>
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button
                      onClick={() => startEditing(vendor)}
                      className="bg-yellow-500 text-white px-2 py-1 text-sm rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vendor._id)}
                      className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllVendors;

