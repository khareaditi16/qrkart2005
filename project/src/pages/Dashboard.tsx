import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, DollarSign, Star, Clock } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import QuickActions from '../components/Dashboard/QuickActions';
import QRCodeDisplay from '../components/Dashboard/QRCodeDisplay';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

interface VendorData {
  name: string;
  upiId: string;
  totalOrders: number;
  revenue: number;
  rating: number;
  pendingTasks: number;
}

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user, setUser } = useAuth();

  const [vendorData, setVendorData] = useState<VendorData | null>(null);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        let vendorId = user?.id;

        // ⛑️ Fallback: Try localStorage if user not found in context
        if (!vendorId) {
          const stored = localStorage.getItem('vendor');
          if (stored) {
            const parsed = JSON.parse(stored);
            setUser(parsed); // Update context
            vendorId = parsed.id;
          }
        }

        if (!vendorId) return;

        const res = await axios.get(`http://localhost:5000/api/vendor/${vendorId}`);
        setVendorData(res.data);
      } catch (error) {
        console.error('❌ Error fetching vendor data:', error);
      }
    };

    fetchVendorData();
  }, [user?.id, setUser]);

  const stats = vendorData
    ? [
        {
          title: t('dashboard.totalOrders'),
          value: vendorData.totalOrders?.toString() || '0',
          change: '+12% from last month',
          icon: ShoppingCart,
          color: 'bg-gradient-to-r from-primary-500 to-primary-600',
        },
        {
          title: t('dashboard.revenue'),
          value: `₹${vendorData.revenue || 0}`,
          change: '+18% from last month',
          icon: DollarSign,
          color: 'bg-gradient-to-r from-secondary-500 to-secondary-600',
        },
        {
          title: t('dashboard.rating'),
          value: (vendorData.rating || 0).toFixed(1),
          change: 'Based on reviews',
          icon: Star,
          color: 'bg-gradient-to-r from-accent-500 to-accent-600',
        },
        {
          title: t('dashboard.pendingTasks'),
          value: vendorData.pendingTasks?.toString() || '0',
          change: '2 urgent tasks',
          icon: Clock,
          color: 'bg-gradient-to-r from-red-500 to-red-600',
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('dashboard.welcome')}, {vendorData?.name || user?.name || 'Vendor'}!
          </h1>
          <p className="text-gray-600">{t('dashboard.overview')}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <QuickActions />
          </div>
          <div className="lg:col-span-1">
            <QRCodeDisplay
              vendorId={user?.id || '1'}
              upiId={vendorData?.upiId || 'vendor@upi'}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[
                {
                  time: '2 hours ago',
                  activity: 'Payment received from customer #1234',
                  amount: '+₹250',
                  type: 'success',
                },
                {
                  time: '4 hours ago',
                  activity: 'Cart renovation request submitted',
                  amount: 'Pending',
                  type: 'warning',
                },
                {
                  time: '1 day ago',
                  activity: 'Profile verification completed',
                  amount: 'Completed',
                  type: 'success',
                },
                {
                  time: '2 days ago',
                  activity: 'Loan application submitted',
                  amount: 'Under Review',
                  type: 'info',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.activity}</p>
                    <p className="text-sm text-gray-600">{item.time}</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.type === 'success'
                        ? 'bg-green-100 text-green-800'
                        : item.type === 'warning'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {item.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
