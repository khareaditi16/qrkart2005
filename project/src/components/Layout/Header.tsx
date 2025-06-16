import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthProvider';
import { QrCode, Globe, LogOut, User } from 'lucide-react';
import LanguageToggle from '../UI/LanguageToggle';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              QRKart
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              {t('nav.home')}
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`font-medium transition-colors duration-200 ${
                  isActive('/dashboard') 
                    ? 'text-primary-600 border-b-2 border-primary-600' 
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {t('nav.dashboard')}
              </Link>
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('nav.logout')}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;