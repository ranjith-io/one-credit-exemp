import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // useNavigate for navigation
import AuthPage from './components/AuthPage';
import StartPage from './components/student/StartPage';
import RegistrationPage from './components/student/RegistrationPage';
import AdminPage from './components/admin/AdminPage';
import RegisDetails from './components/admin/regisDetails';
import WelcomeAdmin from './components/admin/WelcomAdmin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); // useNavigate for redirecting 

  const handleLoginSuccess = (response,isAdminUser) => {
    console.log('Login successfully done:', response);
    setIsAuthenticated(true);
    setIsAdmin(isAdminUser);
    if (isAdminUser) {
      navigate('/main');
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
      path="/main" 
      element={isAuthenticated && isAdmin ? <WelcomeAdmin /> : <AuthPage onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />}      
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
      <Route path='/admin' element={<AdminPage/>}/>
    </Routes>
  );
}

export default App;
