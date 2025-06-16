import React, { useState } from 'react';
import { DollarSign, Calendar, TrendingUp, AlertCircle, Plus, FileText, CreditCard } from 'lucide-react';

interface LoanManagerProps {
  onClose: () => void;
}

const LoanManager: React.FC<LoanManagerProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'current' | 'history' | 'apply'>('current');
  const [loanApplication, setLoanApplication] = useState({
    amount: '',
    purpose: 'business-expansion',
    tenure: '12',
    monthlyIncome: '',
    businessAge: '',
  });

  const currentLoans = [
    {
      id: 'LOAN001',
      amount: 50000,
      disbursedAmount: 50000,
      remainingAmount: 32000,
      interestRate: 12.5,
      tenure: 24,
      monthlyEmi: 2400,
      nextDueDate: '2024-02-15',
      status: 'active',
      appliedAt: '2023-06-15',
      purpose: 'Cart Renovation',
      paidInstallments: 8,
      totalInstallments: 24,
    }
  ];

  const loanHistory = [
    {
      id: 'LOAN002',
      amount: 25000,
      status: 'completed',
      completedAt: '2023-05-20',
      purpose: 'Equipment Purchase',
      totalInterestPaid: 3200,
    },
    {
      id: 'LOAN003',
      amount: 75000,
      status: 'rejected',
      appliedAt: '2023-03-10',
      purpose: 'Business Expansion',
      rejectionReason: 'Insufficient documentation',
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleLoanApplication = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting loan application:', loanApplication);
    alert('Loan application submitted successfully! You will receive a response within 3-5 business days.');
    setActiveTab('current');
    setLoanApplication({
      amount: '',
      purpose: 'business-expansion',
      tenure: '12',
      monthlyIncome: '',
      businessAge: '',
    });
  };

  const calculateEMI = (principal: number, rate: number, tenure: number) => {
    const monthlyRate = rate / (12 * 100);
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Loan Management</h3>
            <p className="text-gray-600">Manage your business loans and applications</p>
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
            { key: 'current', label: 'Active Loans', icon: CreditCard },
            { key: 'history', label: 'Loan History', icon: FileText },
            { key: 'apply', label: 'Apply for Loan', icon: Plus },
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

        {/* Current Loans Tab */}
        {activeTab === 'current' && (
          <div className="space-y-6">
            {currentLoans.length > 0 ? (
              currentLoans.map((loan) => (
                <div key={loan.id} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Loan #{loan.id}</h4>
                      <p className="text-gray-600">{loan.purpose}</p>
                      <p className="text-sm text-gray-500">Applied: {loan.appliedAt}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(loan.status)}`}>
                      {loan.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Loan Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600">Loan Amount</p>
                      <p className="text-lg font-semibold text-gray-900">₹{loan.amount.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600">Remaining</p>
                      <p className="text-lg font-semibold text-red-600">₹{loan.remainingAmount.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600">Monthly EMI</p>
                      <p className="text-lg font-semibold text-gray-900">₹{loan.monthlyEmi.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600">Interest Rate</p>
                      <p className="text-lg font-semibold text-gray-900">{loan.interestRate}%</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Repayment Progress ({loan.paidInstallments}/{loan.totalInstallments} installments)
                      </span>
                      <span className="text-sm text-gray-600">
                        {Math.round((loan.paidInstallments / loan.totalInstallments) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(loan.paidInstallments / loan.totalInstallments) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Next Due Date */}
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-gray-900">Next EMI Due</p>
                        <p className="text-sm text-gray-600">{loan.nextDueDate}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      Pay Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No Active Loans</h4>
                <p className="text-gray-600 mb-4">You don't have any active loans at the moment.</p>
                <button
                  onClick={() => setActiveTab('apply')}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Apply for Loan
                </button>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {loanHistory.map((loan) => (
              <div key={loan.id} className="bg-gray-50 rounded-xl p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Loan #{loan.id}</h4>
                    <p className="text-gray-600">{loan.purpose}</p>
                    <p className="text-sm text-gray-500">
                      {loan.status === 'completed' ? `Completed: ${loan.completedAt}` : `Applied: ${loan.appliedAt}`}
                    </p>
                    {loan.status === 'rejected' && (
                      <p className="text-sm text-red-600 mt-1">Reason: {loan.rejectionReason}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(loan.status)}`}>
                      {loan.status.toUpperCase()}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">₹{loan.amount.toLocaleString()}</p>
                    {loan.totalInterestPaid && (
                      <p className="text-xs text-gray-500">Interest paid: ₹{loan.totalInterestPaid.toLocaleString()}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Apply Tab */}
        {activeTab === 'apply' && (
          <form onSubmit={handleLoanApplication} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₹)</label>
                <input
                  type="number"
                  value={loanApplication.amount}
                  onChange={(e) => setLoanApplication({ ...loanApplication, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="50000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Purpose</label>
                <select
                  value={loanApplication.purpose}
                  onChange={(e) => setLoanApplication({ ...loanApplication, purpose: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="business-expansion">Business Expansion</option>
                  <option value="cart-renovation">Cart Renovation</option>
                  <option value="equipment-purchase">Equipment Purchase</option>
                  <option value="inventory">Inventory</option>
                  <option value="working-capital">Working Capital</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tenure (Months)</label>
                <select
                  value={loanApplication.tenure}
                  onChange={(e) => setLoanApplication({ ...loanApplication, tenure: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="6">6 Months</option>
                  <option value="12">12 Months</option>
                  <option value="18">18 Months</option>
                  <option value="24">24 Months</option>
                  <option value="36">36 Months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (₹)</label>
                <input
                  type="number"
                  value={loanApplication.monthlyIncome}
                  onChange={(e) => setLoanApplication({ ...loanApplication, monthlyIncome: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="25000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Age (Years)</label>
                <input
                  type="number"
                  value={loanApplication.businessAge}
                  onChange={(e) => setLoanApplication({ ...loanApplication, businessAge: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="2"
                  required
                />
              </div>
            </div>

            {/* EMI Calculator */}
            {loanApplication.amount && (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h5 className="font-medium text-gray-900 mb-2">Estimated EMI</h5>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{calculateEMI(
                    parseInt(loanApplication.amount), 
                    12.5, 
                    parseInt(loanApplication.tenure)
                  ).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">*Interest rate: 12.5% per annum</p>
              </div>
            )}

            {/* Required Documents */}
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Required Documents</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Aadhaar Card</li>
                    <li>• PAN Card</li>
                    <li>• Bank Statements (Last 6 months)</li>
                    <li>• Business Registration Certificate</li>
                    <li>• Income Proof</li>
                  </ul>
                </div>
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
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoanManager;