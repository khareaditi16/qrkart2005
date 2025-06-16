import React, { useState } from 'react';
import { Truck, CheckCircle, Clock, AlertCircle, Plus, Upload, MessageSquare } from 'lucide-react';

interface RenovationTrackerProps {
  onClose: () => void;
}

const RenovationTracker: React.FC<RenovationTrackerProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'current' | 'history' | 'request'>('current');
  const [newRequest, setNewRequest] = useState({
    type: 'repair',
    description: '',
    urgency: 'medium',
  });

  const currentRenovations = [
    {
      id: 'REN001',
      type: 'Cart Repair',
      status: 'in-progress',
      progress: 60,
      currentStep: 2,
      totalSteps: 4,
      stepName: 'Parts Installation',
      requestedAt: '2024-01-15',
      estimatedCompletion: '2024-01-25',
      cost: 5500,
      contractor: 'Mumbai Cart Services',
      description: 'Wheel replacement and paint touch-up',
      updates: [
        { date: '2024-01-15', message: 'Request submitted and approved', status: 'completed' },
        { date: '2024-01-18', message: 'Parts ordered and contractor assigned', status: 'completed' },
        { date: '2024-01-20', message: 'Work started - wheel replacement in progress', status: 'current' },
        { date: '2024-01-25', message: 'Final inspection and delivery', status: 'pending' },
      ]
    }
  ];

  const renovationHistory = [
    {
      id: 'REN002',
      type: 'Cart Upgrade',
      status: 'completed',
      completedAt: '2023-12-10',
      cost: 8500,
      rating: 5,
      description: 'Added new display shelves and LED lighting',
    },
    {
      id: 'REN003',
      type: 'Maintenance',
      status: 'completed',
      completedAt: '2023-10-15',
      cost: 2200,
      rating: 4,
      description: 'Regular maintenance and cleaning',
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting renovation request:', newRequest);
    alert('Renovation request submitted successfully!');
    setActiveTab('current');
    setNewRequest({ type: 'repair', description: '', urgency: 'medium' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Cart Renovation Tracker</h3>
            <p className="text-gray-600">Track your cart renovation and maintenance requests</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          {[
            { key: 'current', label: 'Current Projects', icon: Clock },
            { key: 'history', label: 'History', icon: CheckCircle },
            { key: 'request', label: 'New Request', icon: Plus },
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Current Projects Tab */}
        {activeTab === 'current' && (
          <div className="space-y-6">
            {currentRenovations.length > 0 ? (
              currentRenovations.map((renovation) => (
                <div key={renovation.id} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{renovation.type}</h4>
                      <p className="text-gray-600">{renovation.description}</p>
                      <p className="text-sm text-gray-500 mt-1">ID: {renovation.id}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(renovation.status)}`}>
                        {renovation.status.replace('-', ' ').toUpperCase()}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">₹{renovation.cost.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Step {renovation.currentStep} of {renovation.totalSteps}: {renovation.stepName}
                      </span>
                      <span className="text-sm text-gray-600">{renovation.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${renovation.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-900">Progress Updates</h5>
                    {renovation.updates.map((update, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-3 h-3 rounded-full mt-2 ${
                          update.status === 'completed' ? 'bg-green-500' :
                          update.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{update.message}</p>
                          <p className="text-xs text-gray-500">{update.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Contractor Info */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Contractor: {renovation.contractor}</p>
                        <p className="text-sm text-gray-600">Est. completion: {renovation.estimatedCompletion}</p>
                      </div>
                      <button className="flex items-center space-x-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span>Contact</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No Active Renovations</h4>
                <p className="text-gray-600 mb-4">You don't have any ongoing renovation projects.</p>
                <button
                  onClick={() => setActiveTab('request')}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Request Renovation
                </button>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {renovationHistory.map((renovation) => (
              <div key={renovation.id} className="bg-gray-50 rounded-xl p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{renovation.type}</h4>
                    <p className="text-gray-600">{renovation.description}</p>
                    <p className="text-sm text-gray-500 mt-1">Completed: {renovation.completedAt}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(renovation.status)}`}>
                      COMPLETED
                    </span>
                    <p className="text-sm text-gray-600 mt-1">₹{renovation.cost.toLocaleString()}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < renovation.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* New Request Tab */}
        {activeTab === 'request' && (
          <form onSubmit={handleRequestSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Request Type</label>
              <select
                value={newRequest.type}
                onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="repair">Repair</option>
                <option value="upgrade">Upgrade</option>
                <option value="maintenance">Maintenance</option>
                <option value="customization">Customization</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newRequest.description}
                onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Describe what needs to be done..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'low', label: 'Low', color: 'border-green-300 text-green-700' },
                  { value: 'medium', label: 'Medium', color: 'border-yellow-300 text-yellow-700' },
                  { value: 'high', label: 'High', color: 'border-red-300 text-red-700' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setNewRequest({ ...newRequest, urgency: option.value })}
                    className={`p-3 border-2 rounded-lg text-center transition-all ${
                      newRequest.urgency === option.value
                        ? `${option.color} bg-opacity-10`
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setActiveTab('current')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Submit Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RenovationTracker;