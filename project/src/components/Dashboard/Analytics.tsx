import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Calendar, Filter } from 'lucide-react';

interface AnalyticsProps {
  onClose: () => void;
}

const Analytics: React.FC<AnalyticsProps> = ({ onClose }) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'sales' | 'customers'>('overview');

  const analyticsData = {
    overview: {
      totalRevenue: 45230,
      totalOrders: 156,
      avgOrderValue: 290,
      customerRetention: 68,
      revenueGrowth: 18,
      orderGrowth: 12,
    },
    sales: [
      { date: '2024-01-01', revenue: 1200, orders: 8 },
      { date: '2024-01-02', revenue: 1800, orders: 12 },
      { date: '2024-01-03', revenue: 950, orders: 6 },
      { date: '2024-01-04', revenue: 2100, orders: 14 },
      { date: '2024-01-05', revenue: 1650, orders: 11 },
      { date: '2024-01-06', revenue: 2300, orders: 16 },
      { date: '2024-01-07', revenue: 1900, orders: 13 },
    ],
    topProducts: [
      { name: 'Samosa', sales: 45, revenue: 2250 },
      { name: 'Tea', sales: 89, revenue: 1780 },
      { name: 'Vada Pav', sales: 34, revenue: 1360 },
      { name: 'Bhel Puri', sales: 28, revenue: 1400 },
    ],
    customerInsights: {
      newCustomers: 23,
      returningCustomers: 67,
      peakHours: ['10:00-12:00', '17:00-19:00'],
      avgSessionTime: '4.5 min',
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
    <div className="bg-white rounded-xl p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          trend === 'up' ? 'bg-green-100' : trend === 'down' ? 'bg-red-100' : 'bg-blue-100'
        }`}>
          <Icon className={`w-5 h-5 ${
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-blue-600'
          }`} />
        </div>
        <div className={`flex items-center space-x-1 text-sm ${
          trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
        }`}>
          {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : trend === 'down' ? <TrendingDown className="w-4 h-4" /> : null}
          <span>{change}</span>
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Business Analytics</h3>
            <p className="text-gray-600">Track your performance and insights</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { key: '7d', label: '7 Days' },
              { key: '30d', label: '30 Days' },
              { key: '90d', label: '90 Days' },
              { key: '1y', label: '1 Year' },
            ].map((range) => (
              <button
                key={range.key}
                onClick={() => setTimeRange(range.key as any)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  timeRange === range.key
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Export</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'sales', label: 'Sales' },
            { key: 'customers', label: 'Customers' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Revenue"
                value={`₹${analyticsData.overview.totalRevenue.toLocaleString()}`}
                change={`+${analyticsData.overview.revenueGrowth}%`}
                icon={DollarSign}
                trend="up"
              />
              <StatCard
                title="Total Orders"
                value={analyticsData.overview.totalOrders}
                change={`+${analyticsData.overview.orderGrowth}%`}
                icon={ShoppingCart}
                trend="up"
              />
              <StatCard
                title="Avg Order Value"
                value={`₹${analyticsData.overview.avgOrderValue}`}
                change="+5%"
                icon={TrendingUp}
                trend="up"
              />
              <StatCard
                title="Customer Retention"
                value={`${analyticsData.overview.customerRetention}%`}
                change="+3%"
                icon={Users}
                trend="up"
              />
            </div>

            {/* Revenue Chart Placeholder */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h4>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Chart visualization would appear here</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sales Tab */}
        {activeTab === 'sales' && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h4>
              <div className="space-y-3">
                {analyticsData.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <h5 className="font-medium text-gray-900">{product.name}</h5>
                      <p className="text-sm text-gray-600">{product.sales} units sold</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{product.revenue}</p>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${(product.sales / 89) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Customer Breakdown</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">New Customers</span>
                    <span className="font-semibold">{analyticsData.customerInsights.newCustomers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Returning Customers</span>
                    <span className="font-semibold">{analyticsData.customerInsights.returningCustomers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg Session Time</span>
                    <span className="font-semibold">{analyticsData.customerInsights.avgSessionTime}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Peak Hours</h4>
                <div className="space-y-2">
                  {analyticsData.customerInsights.peakHours.map((hour, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                      <span className="text-gray-700">{hour}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;