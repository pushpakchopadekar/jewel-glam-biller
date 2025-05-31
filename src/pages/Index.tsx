
import React, { useState } from 'react';
import WelcomePage from '../components/WelcomePage';
import AuthenticationFlow from '../components/AuthenticationFlow';
import MainDashboard from '../components/MainDashboard';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'auth' | 'dashboard'>('welcome');

  const handleEnterShop = () => {
    setCurrentScreen('auth');
  };

  const handleAuthSuccess = () => {
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentScreen('welcome');
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'welcome' && (
        <WelcomePage onEnterShop={handleEnterShop} />
      )}
      {currentScreen === 'auth' && (
        <AuthenticationFlow onAuthSuccess={handleAuthSuccess} />
      )}
      {currentScreen === 'dashboard' && (
        <MainDashboard onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
