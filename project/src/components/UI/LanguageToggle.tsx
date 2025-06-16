import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 rounded-lg hover:bg-gray-50"
    >
      <Globe className="w-4 h-4" />
      <span className="uppercase font-semibold">
        {i18n.language === 'en' ? 'EN' : 'हि'}
      </span>
    </button>
  );
};

export default LanguageToggle;