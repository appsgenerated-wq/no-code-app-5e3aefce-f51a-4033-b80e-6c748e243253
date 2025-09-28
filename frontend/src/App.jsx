import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService.js';
import config from './constants.js';
import './index.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest({ appId: config.APP_ID, baseURL: config.BACKEND_URL });

  useEffect(() => {
    const initializeApp = async () => {
      console.log('🚀 [APP] Initializing application...');
      const connectionResult = await testBackendConnection();
      setBackendConnected(connectionResult.success);

      if (connectionResult.success) {
        console.log('✅ [APP] Backend connection successful.');
        try {
          const userResult = await manifest.from('User').me();
          if (userResult) {
            setCurrentUser(userResult);
            setCurrentScreen('dashboard');
            console.log('👤 [APP] User session found:', userResult.email);
          }
        } catch (error) {
          console.log('ℹ️ [APP] No active user session.');
          setCurrentUser(null);
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', connectionResult.error);
      }
    };

    initializeApp();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const userRecord = await manifest.from('User').me();
      setCurrentUser(userRecord);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
        await manifest.from('User').signup({ name, email, password });
        await handleLogin(email, password);
    } catch (error) {
        console.error('Signup failed:', error);
        alert('Signup failed. The email might already be in use.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setCurrentUser(null);
    setCurrentScreen('landing');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm text-gray-600">{backendConnected ? 'API Connected' : 'API Disconnected'}</span>
      </div>

      {currentScreen === 'landing' || !currentUser ? (
        <LandingPage onLogin={handleLogin} onSignup={handleSignup} />
      ) : (
        <DashboardPage user={currentUser} onLogout={handleLogout} manifest={manifest} />
      )}
    </div>
  );
}

export default App;
