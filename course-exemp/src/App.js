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
  const [name, setName] = useState(''); // State to store admin name
  const handleLoginSuccess = (response,isAdminUser,name) => {
    // console.log('Login successfully done:', response);
    setIsAuthenticated(true);
    setIsAdmin(isAdminUser);
    setName(name);
    
    if (isAdminUser) {
      navigate('/main');
    }
    else{
    navigate('/start');  // Redirect to student page
  }
};

  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<AuthPage onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />}// onLoginSuccess is a property
      />
      <Route 
      path="/main" 
      element={isAuthenticated && isAdmin ? <WelcomeAdmin Name={name} /> : <AuthPage onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />}      
      />
      <Route
        path="/start"
        element={isAuthenticated ? <StartPage Name={name} /> : <AuthPage onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />}
      />
      
      <Route 
      path="/registration" 
      element={isAuthenticated ? <RegistrationPage /> : <AuthPage onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />}      
      />
      <Route 
      path="/details" 
      element={isAuthenticated && isAdmin ? <RegisDetails /> : <AuthPage onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />}      
      />
      <Route 
      path="/admin" 
      element={isAuthenticated && isAdmin ? <AdminPage  /> : <AuthPage onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />}      
      />
    </Routes>
  );
}

export default App;
