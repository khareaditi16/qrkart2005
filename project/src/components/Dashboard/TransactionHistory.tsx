import React, { useState } from 'react';
import { Receipt, Download, Filter, Search, Calendar, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface TransactionHistoryProps {
  onClose: () => void;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'credit' | 'debit'>('all');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  const transactions = [
    {
      id: 'TXN001',
      type: 'credit',
      amount: 250,
      description: 'Payment from customer #1234',
      method: 'UPI',
      date: '2024-01-20T10:30:00',
      status: 'completed',
      reference: 'UPI123456789',
    },
    {
      id: 'TXN002',
      type: 'debit',
      amount: 50,
      description: 'Platform fee',
      method: 'Auto-debit',
      date: '2024-01-20T09:15:00',
      status: 'completed',
      reference: 'FEE202401001',
    },
    {
      id: 'TXN003',
      type: 'credit',
      amount: 180,
      description: 'Payment from customer #1235',
      method: 'UPI',
      date: '2024-01-19T16:45:00',
      status: 'completed',
      reference: 'UPI987654321',
    },
    {
      id: 'TXN004',
      type: 'credit',
      amount: 320,
      description: 'Payment from customer #1236',
      method: 'QR Code',
      date: '2024-01-19T14:20:00',
      status: 'completed',
      reference: 'QR456789123',
    },
    {
      id: 'TXN005',
      type: 'debit',
      amount: 1200,
      description: 'Cart renovation payment',
      method: 'Bank Transfer',
      date: '2024-01-18T11:00:00',
      status: 'completed',
      reference: 'BT789123456',
    },
    {
      id: 'TXN006',
      type: 'credit',
      amount: 95,
      description: 'Payment from customer #1237',
      method: 'UPI',
      date: '2024-01-18T08:30:00',
      status: 'pending',
      reference: 'UPI147258369',
    },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    
    // Date filtering logic would go here
    return matchesSearch && matchesType;
  });

  const totalCredit = transactions
    .filter(t => t.type === 'credit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebit = transactions
    .filter(t => t.type === 'debit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const exportTransactions = () => {
    const csvContent = [
      ['Date', 'Type', 'Amount', 'Description', 'Method', 'Status', 'Reference'],
      ...filteredTransactions.map(t => [
        formatDate(t.date),
        t.type,
        t.amount,
        t.description,
        t.method,
        t.status,
        t.reference,
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Transaction History</h3>
            <p className="text-gray-600">View and manage your payment transactions</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Credits</p>
                <p className="text-2xl font-bold text-green-700">₹{totalCredit.toLocaleString()}</p>
              </div>
              <ArrowDownLeft className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Total Debits</p>
                <p className="text-2xl font-bold text-red-700">₹{totalDebit.toLocaleString()}</p>
              </div>
              <ArrowUpRight className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Net Balance</p>
                <p className="text-2xl font-bold text-blue-700">₹{(totalCredit - totalDebit).toLocaleString()}</p>
              </div>
              <Receipt className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Types</option>
              <option value="credit">Credits</option>
              <option value="debit">Debits</option>
            </select>
            
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </select>
            
            <button
              onClick={exportTransactions}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <ArrowDownLeft className={`w-5 h-5 ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`} />
                      ) : (
                        <ArrowUpRight className={`w-5 h-5 ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`} />
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{transaction.method}</span>
                        <span>•</span>
                        <span>{formatDate(transaction.date)}</span>
                        <span>•</span>
                        <span>Ref: {transaction.reference}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No Transactions Found</h4>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination would go here if needed */}
        {filteredTransactions.length > 10 && (
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
              <button className="px-3 py-2 bg-primary-600 text-white rounded-lg">1</button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;