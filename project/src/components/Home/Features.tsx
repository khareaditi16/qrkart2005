import React from 'react';
import { useTranslation } from 'react-i18next';
import { QrCode, CreditCard, Truck, DollarSign, MapPin, BarChart3 } from 'lucide-react';

const Features: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: QrCode,
      title: t('features.qrVerification.title'),
      description: t('features.qrVerification.description'),
      gradient: 'from-primary-500 to-primary-600',
    },
    {
      icon: CreditCard,
      title: t('features.upiPayments.title'),
      description: t('features.upiPayments.description'),
      gradient: 'from-secondary-500 to-secondary-600',
    },
    {
      icon: Truck,
      title: t('features.cartRenovation.title'),
      description: t('features.cartRenovation.description'),
      gradient: 'from-accent-500 to-accent-600',
    },
    {
      icon: DollarSign,
      title: t('features.loanManagement.title'),
      description: t('features.loanManagement.description'),
      gradient: 'from-green-500 to-green-600',
    },
    {
      icon: MapPin,
      title: t('features.geolocation.title'),
      description: t('features.geolocation.description'),
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: BarChart3,
      title: t('features.analytics.title'),
      description: t('features.analytics.description'),
      gradient: 'from-pink-500 to-pink-600',
    },
  ];

  return (
    <section className="py-20 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('features.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;