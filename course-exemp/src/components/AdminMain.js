import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css'; 

function AdminMain() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState(''); // State to store admin name

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('googleUser')); // Assume details are stored in localStorage
    if (storedUser && storedUser.name) {
      setAdminName(storedUser.name);
    } else {
      navigate('/'); // Redirect to login if no user details are found
    }
  }, [navigate]);

  const handleMenuClick = (path) => {
    navigate(path); // Navigate to the specified path
  };
  const handleLogout = () => {
    navigate('/'); // Redirect to the login page
  };


  return (
    <div className="container">
      {/* Sidebar Section */}
      <div className="sidebar">
        <h2>Admin Menu</h2>
        <ul>
        <li>
            <button onClick={() => handleMenuClick('/main')}>Mainer</button>
          </li>
          <li>
            <button onClick={() => handleMenuClick('/admin')}>One Credit Exemption Requests</button>
          </li>
          <li>
            <button onClick={() => handleMenuClick('/details')}>Registration Details</button>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
          
        </ul>
      </div>

      {/* Main Content Section */}
      <div className="main-content">
        <h1>Welcome, Admin!</h1>
        <h2>{adminName}</h2>
      </div>
    </div>
  );
}

export default AdminMain;
