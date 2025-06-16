import React, { useEffect, useState } from 'react';
import { User, MapPin, IndianRupee, BadgeCheck } from 'lucide-react';

interface Vendor {
  _id: string;
  name: string;
  upiId: string;
  location: string;
  cartStatus: string;
  coordinates: {
    lat?: number;
    lng?: number;
  };
}

const AllVendors: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/vendor/all'); // ✅ Correct URL
        const data = await res.json();
        setVendors(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch vendors 😢');
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading vendors...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">All Registered Vendors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <div
            key={vendor._id}
            className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-3 mb-2">
              <User className="text-blue-600" />
              <p className="font-semibold">{vendor.name}</p>
            </div>

            <div className="flex items-center space-x-3 mb-2">
              <IndianRupee className="text-green-600" />
              <p>{vendor.upiId}</p>
            </div>

            <div className="flex items-center space-x-3 mb-2">
              <MapPin className="text-pink-600" />
              <p>{vendor.location}</p>
            </div>

            <div className="flex items-center space-x-3">
              <BadgeCheck
                className={`${
                  vendor.cartStatus === 'Renovated'
                    ? 'text-green-600'
                    : vendor.cartStatus === 'Pending'
                    ? 'text-yellow-600'
                    : 'text-gray-600'
                }`}
              />
              <p className="capitalize">{vendor.cartStatus}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllVendors;
