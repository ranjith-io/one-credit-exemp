import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeAdmin.css';
// import AuthPage from '../AuthPage'; 

function WelcomeAdmin({Name}) {
  const navigate = useNavigate();
  // const [adminName, setAdminName] = useState(''); // State to store admin name

  // const name= AuthPage.decodedToken.name;

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
            <button onClick={() => handleMenuClick('/main')}>WelcomAdmin</button>
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
      <div className="wmain-content">
        <h1>Welcome Admin!{Name}</h1>
      </div>
    </div>
  );
}

export default WelcomeAdmin;
