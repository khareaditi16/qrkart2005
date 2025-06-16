import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import toast from 'react-hot-toast';

const VendorDashboard = () => {
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/vendors/my-vendor', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // ✅ JWT from login
          },
        });
        setVendor(res.data);
      } catch (err) {
        toast.error('Error fetching vendor profile');
      }
    };

    fetchVendor();
  }, []);

  if (!vendor) return <p className="text-center">Loading your dashboard...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Your Vendor Dashboard</h2>
      <p><strong>Name:</strong> {vendor.name}</p>
      <p><strong>Location:</strong> {vendor.location}</p>
      <p><strong>UPI ID:</strong> {vendor.upiId}</p>
      <p>
        <strong>Status:</strong>{' '}
        <span className={`font-semibold ${vendor.isVerified ? 'text-green-600' : 'text-yellow-600'}`}>
          {vendor.isVerified ? 'Verified ✅' : 'Pending Verification ⏳'}
        </span>
      </p>

      <div className="mt-6 text-center">
        <p className="mb-2 font-medium">Scan your QR Code (for UPI or verification)</p>
        <QRCode value={`https://qrkart.vercel.app/vendor/${vendor._id}`} size={160} />
      </div>
    </div>
  );
};

export default VendorDashboard;
