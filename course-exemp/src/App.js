import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // useNavigate for navigation
import AuthPage from './components/AuthPage';
import StartPage from './components/StartPage';
import RegistrationPage from './components/RegistrationPage';
import AdminPage from './components/AdminPage';
import RegisDetails from './components/regisDetails';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); // useNavigate for redirecting 

  const handleLoginSuccess = (response,isAdminUser) => {
    console.log('Login successfully done:', response);
    setIsAuthenticated(true);
    setIsAdmin(isAdminUser);
    if (isAdminUser) {
      navigate('/admin');
    }
    else{
    navigate('/start'); // Redirect to student page
  }
};

  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
  };

  return (
    <Routes>
      <Route 
      path="/admin" 
      element={isAuthenticated && isAdmin ? <AdminPage /> : <AuthPage onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />}      
      />
      <Route
        path="/"
        element={<AuthPage onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />}
      />
      <Route
        path="/start"
        element={isAuthenticated ? <StartPage /> : <AuthPage onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />}
      />
      
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/details" element={<RegisDetails />} />
    </Routes>
  );
}

export default App;
