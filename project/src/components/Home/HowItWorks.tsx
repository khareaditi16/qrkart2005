import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserPlus, Shield, QrCode, TrendingUp } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: UserPlus,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
    },
    {
      icon: Shield,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-100',
    },
    {
      icon: QrCode,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
      color: 'text-accent-600',
      bgColor: 'bg-accent-100',
    },
    {
      icon: TrendingUp,
      title: t('howItWorks.step4.title'),
      description: t('howItWorks.step4.description'),
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  return (
    <section className="py-20 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('howItWorks.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-secondary-200 to-accent-200 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`relative w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-10 h-10 ${step.color}`} />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-sm font-bold text-gray-600">{index + 1}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-50 to-secondary-50 px-6 py-3 rounded-full">
            <div className="w-3 h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 font-medium">Join 10,000+ vendors already using QRKart</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;