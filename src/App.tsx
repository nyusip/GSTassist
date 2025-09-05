import * as React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  useNavigate, 
  useLocation,
  Navigate
} from "react-router-dom";

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import RegistrationWizard from './components/RegistrationWizard';
import SupportPage from './components/SupportPage';
import AboutPage from './components/AboutPage';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import RemindersPage from './components/RemindersPage';
import DocumentRepositoryPage from './components/DocumentRepositoryPage';
import NewRegistrationPage from './components/NewRegistrationPage';
import TrnLoginPage from './components/TrnLoginPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

const AppContent: React.FC<{
  isAuthenticated: boolean;
  onLogout: () => void;
  onLogin: () => void;
}> = ({ isAuthenticated, onLogout, onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleStartRegistration = () => navigate('/new-registration');
  const handleShowReminders = () => navigate('/reminders');
  const handleShowDocumentRepository = () => navigate('/document-repository');
  const handleBackToHome = () => navigate('/');

  const shouldShowNavbar = true; // Always show Navbar

  if (!isAuthenticated && location.pathname !== '/login' && location.pathname !== '/signup') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {shouldShowNavbar && (
        <Navbar
          isAuthenticated={isAuthenticated}
          onLogout={onLogout}
        />
      )}
      <main className={shouldShowNavbar ? "pt-20" : ""}>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <HomePage
                  onStartRegistration={handleStartRegistration}
                  onShowReminders={handleShowReminders}
                  onShowDocumentRepository={handleShowDocumentRepository}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/landing" element={isAuthenticated ? <LandingPage onStartRegistration={handleStartRegistration} /> : <Navigate to="/login" />} />
          <Route path="/wizard" element={isAuthenticated ? <RegistrationWizard onBackToHome={handleBackToHome} /> : <Navigate to="/login" />} />
          <Route path="/reminders" element={isAuthenticated ? <RemindersPage /> : <Navigate to="/login" />} />
          <Route path="/document-repository" element={isAuthenticated ? <DocumentRepositoryPage /> : <Navigate to="/login" />} />
          <Route path="/support" element={isAuthenticated ? <SupportPage /> : <Navigate to="/login" />} />
          <Route path="/about" element={isAuthenticated ? <AboutPage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/new-registration" element={isAuthenticated ? <NewRegistrationPage /> : <Navigate to="/login" />} />
          <Route path="/trn-login" element={isAuthenticated ? <TrnLoginPage /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
