import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, MapPin, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthProvider';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    upiId: '',
    password: '',
    location: '',
  });

  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject('Geolocation is not supported.');
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          reject('Failed to fetch location. Please allow location access.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const coords = await getCurrentLocation();
      setCoordinates(coords);

     const res = await fetch('/api/vendor/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ...formData, coordinates: coords }),
});


      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        localStorage.setItem('vendor', JSON.stringify(data.vendor));
        setUser(data.vendor); // ✅ update AuthContext
        navigate('/dashboard');
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err: any) {
      setLoading(false);
      setError(typeof err === 'string' ? err : 'Location or server error.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-md rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Vendor Registration</h2>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" />
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="pl-10 w-full py-2 border rounded-lg"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 w-full py-2 border rounded-lg"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              name="upiId"
              type="text"
              placeholder="Your UPI ID"
              value={formData.upiId}
              onChange={handleChange}
              className="pl-10 w-full py-2 border rounded-lg"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 pr-10 w-full py-2 border rounded-lg"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" />
            <input
              name="location"
              type="text"
              placeholder="Your Address"
              value={formData.location}
              onChange={handleChange}
              className="pl-10 w-full py-2 border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold transition-transform ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
