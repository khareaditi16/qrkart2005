import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent">
              {t('hero.title')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Link
              to="/register"
              className="group bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>{t('hero.getStarted')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <button className="group flex items-center space-x-2 px-8 py-4 text-gray-700 hover:text-primary-600 font-semibold text-lg transition-colors duration-200">
              <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                <Play className="w-5 h-5 text-primary-600 ml-1" />
              </div>
              <span>{t('hero.learnMore')}</span>
            </button>
          </div>
        </div>

        {/* Feature cards preview */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: '📱', title: 'QR Verification', color: 'from-primary-500 to-primary-600' },
            { icon: '💳', title: 'UPI Payments', color: 'from-secondary-500 to-secondary-600' },
            { icon: '📊', title: 'Analytics', color: 'from-accent-500 to-accent-600' },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white text-xl mb-4 mx-auto`}>
                {item.icon}
              </div>
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;