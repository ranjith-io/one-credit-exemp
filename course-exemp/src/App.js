import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // useNavigate for navigation
import AuthPage from './components/AuthPage';
import StartPage from './components/StartPage';
import RegistrationPage from './components/RegistrationPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // useNavigate for redirecting after login

  const handleLoginSuccess = (response) => {
    console.log('Login successful:', response);
    setIsAuthenticated(true);
    navigate('/start'); // Redirect to /start after successful login
  };

  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<AuthPage onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />}
      />
      <Route
        path="/start"
        element={isAuthenticated ? <StartPage /> : <AuthPage onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />}
      />
      <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
  );
}

export default App;
