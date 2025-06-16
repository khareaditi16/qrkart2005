import React, { useState } from 'react';
import { QrCode, BarChart3, User, Wrench, DollarSign, Receipt } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import QRGenerator from './QRGenerator';
import Analytics from './Analytics';
import ProfileManager from './ProfileManager';
import RenovationTracker from './RenovationTracker';
import LoanManager from './LoanManager';
import TransactionHistory from './TransactionHistory';

const QuickActions: React.FC = () => {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const actions = [
    {
      icon: QrCode,
      title: t('dashboard.generateQR'),
      color: 'from-primary-500 to-primary-600',
      onClick: () => setActiveModal('qr-generator'),
    },
    {
      icon: BarChart3,
      title: t('dashboard.viewAnalytics'),
      color: 'from-secondary-500 to-secondary-600',
      onClick: () => setActiveModal('analytics'),
    },
    {
      icon: User,
      title: t('dashboard.manageProfile'),
      color: 'from-accent-500 to-accent-600',
      onClick: () => setActiveModal('profile-manager'),
    },
    {
      icon: Wrench,
      title: t('dashboard.requestRenovation'),
      color: 'from-green-500 to-green-600',
      onClick: () => setActiveModal('renovation-tracker'),
    },
    {
      icon: DollarSign,
      title: t('dashboard.applyLoan'),
      color: 'from-purple-500 to-purple-600',
      onClick: () => setActiveModal('loan-manager'),
    },
    {
      icon: Receipt,
      title: t('dashboard.viewTransactions'),
      color: 'from-pink-500 to-pink-600',
      onClick: () => setActiveModal('transaction-history'),
    },
  ];

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.quickActions')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                onClick={action.onClick}
                className="group p-4 bg-gray-50 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-200 hover:shadow-md hover:scale-105"
              >
                <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-700 text-center">{action.title}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'qr-generator' && <QRGenerator onClose={closeModal} />}
      {activeModal === 'analytics' && <Analytics onClose={closeModal} />}
      {activeModal === 'profile-manager' && <ProfileManager onClose={closeModal} />}
      {activeModal === 'renovation-tracker' && <RenovationTracker onClose={closeModal} />}
      {activeModal === 'loan-manager' && <LoanManager onClose={closeModal} />}
      {activeModal === 'transaction-history' && <TransactionHistory onClose={closeModal} />}
    </>
  );
};

export default QuickActions;