import React, { useEffect, useState } from 'react';

interface Coordinates {
  lat: number;
  lng: number;
}

interface Vendor {
  _id: string;
  name: string;
  upiId: string;
  email: string;
  location: string;
  cartStatus: string;
  isVerified: boolean;
  coordinates: Coordinates;
}

interface Alert {
  _id: string;
  vendorId: Vendor;
  message: string;
  timestamp: string;
}

const AdminDashboard = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<string>('');

  // ✅ Fetch all vendors
  const fetchVendors = async () => {
    try {
      const res = await fetch('/api/vendor/all');
      const data = await res.json();
      setVendors(data);
    } catch (err) {
      console.error('Failed to fetch vendors:', err);
    }
  };

  // ✅ Fetch all alerts
  const fetchAlerts = async () => {
    try {
      const res = await fetch('/api/admin/alerts');
      const data = await res.json();
      setAlerts(data);
    } catch (err) {
      console.error('Failed to fetch alerts:', err);
    }
  };

  // ✅ Toggle verification
  const toggleVerify = async (vendorId: string) => {
    try {
      await fetch(`/api/admin/vendor/verify/${vendorId}`, {
        method: 'PATCH',
      });
      fetchVendors();
    } catch (err) {
      console.error('Error verifying vendor:', err);
    }
  };

  // ✅ Delete vendor
  const deleteVendor = async (vendorId: string) => {
    try {
      await fetch(`/api/vendor/${vendorId}`, {
        method: 'DELETE',
      });
      fetchVendors();
    } catch (err) {
      console.error('Error deleting vendor:', err);
    }
  };

  // ✅ Post alert
  const postAlert = async () => {
    if (!selectedVendor || !alertMessage) return alert('Fill both fields!');
    try {
      await fetch('/api/admin/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendorId: selectedVendor, message: alertMessage }),
      });
      setAlertMessage('');
      fetchAlerts();
    } catch (err) {
      console.error('Failed to send alert:', err);
    }
  };

  useEffect(() => {
    fetchVendors();
    fetchAlerts();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard 🛠️</h1>

      {/* Vendors Section */}
      <h2 className="text-xl font-semibold mb-3">All Vendors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {vendors.map((v) => (
          <div key={v._id} className="bg-white shadow rounded-xl p-4 space-y-2">
            <h3 className="text-lg font-bold">{v.name}</h3>
            <p><strong>UPI:</strong> {v.upiId}</p>
            <p><strong>Email:</strong> {v.email || 'N/A'}</p>
            <p><strong>Location:</strong> {v.location}</p>
            <p><strong>Status:</strong> {v.cartStatus}</p>
            <p><strong>Coordinates:</strong> {v.coordinates?.lat}, {v.coordinates?.lng}</p>
            <p className={`font-semibold ${v.isVerified ? 'text-green-600' : 'text-red-500'}`}>
              {v.isVerified ? '✅ Verified' : '❌ Not Verified'}
            </p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => toggleVerify(v._id)}
                className={`px-3 py-1 rounded text-white ${
                  v.isVerified ? 'bg-gray-500 hover:bg-gray-600' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {v.isVerified ? 'Unverify' : 'Verify'}
              </button>
              <button
                onClick={() => deleteVendor(v._id)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Alert Sender */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Send Alert 🚨</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <select
            className="p-2 rounded border w-full md:w-1/3"
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
          >
            <option value="">Select Vendor</option>
            {vendors.map((v) => (
              <option key={v._id} value={v._id}>
                {v.name}
              </option>
            ))}
          </select>
          <input
            className="p-2 rounded border w-full md:w-2/3"
            type="text"
            placeholder="Enter alert message"
            value={alertMessage}
            onChange={(e) => setAlertMessage(e.target.value)}
          />
          <button
            onClick={postAlert}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Send Alert
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <h2 className="text-xl font-semibold mb-3">Alert Logs 📢</h2>
      <div className="bg-white shadow rounded-xl p-4">
        {alerts.length === 0 && <p>No alerts yet.</p>}
        {alerts.map((alert) => (
          <div key={alert._id} className="border-b py-2">
            <p>
              <span className="font-bold">{alert.vendorId?.name || 'Unknown'}</span>: {alert.message}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(alert.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
