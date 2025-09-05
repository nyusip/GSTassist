import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Globe, LifeBuoy, Info, User, Menu, X, Home, LogOut } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Emblem from './Emblem';
import { useState } from 'react';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { id: 'home', path: '/', labelKey: 'navbar.home', icon: <Home className="h-5 w-5" /> },
    { id: 'support', path: '/support', labelKey: 'navbar.support', icon: <LifeBuoy className="h-5 w-5" /> },
    { id: 'about', path: '/about', labelKey: 'navbar.about', icon: <Info className="h-5 w-5" /> },
  ];

  const renderNavButton = (item: typeof navItems[0], isMobile: boolean = false) => (
    <Link
      key={item.id}
      to={item.path}
      onClick={() => {
        if (isMobile) setIsMobileMenuOpen(false);
      }}
      className={`font-medium transition-colors duration-300 flex items-center px-3 py-2 rounded-md
        ${isMobile 
          ? 'text-lg text-gray-700 dark:text-gray-200 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700'
          : `text-sm ${currentPath === item.path ? 'text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`
        }
      `}
    >
      {item.icon}
      <span className="ml-3">{t(item.labelKey)}</span>
    </Link>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <Emblem />
              <span className="font-bold text-xl text-gray-800 dark:text-white">{t('navbar.title')}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => renderNavButton(item))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <div className="relative hidden sm:block">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'gu')}
                className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full py-1.5 pl-8 pr-4 text-sm font-medium text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">EN</option>
                <option value="hi">HI</option>
                <option value="gu">GU</option>
              </select>
            </div>
            
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden"
                >
                  <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <User className="mr-3 h-5 w-5" />
                      {t('navbar.profile')}
                    </Link>
                    <button
                      onClick={() => { onLogout(); setIsProfileMenuOpen(false); }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      {t('navbar.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-full text-sm transition-all duration-300"
              >
                {t('navbar.login')}
              </Link>
            )}
            
             {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-500 dark:text-gray-400"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="space-y-3">
            {navItems.map((item) => renderNavButton(item, true))}
            {/* Additional mobile options can go here */}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
