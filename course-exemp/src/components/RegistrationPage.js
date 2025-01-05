import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css'; // Reuse the same styles for consistency

function RegistrationPage() {
    const navigate = useNavigate(); // Initialize the navigate function for logout
    
    const handlelogin =(e) => {
        navigate('/start');
    };
    
      const handleLogout = () => {
        // Redirect to AuthPage (login page) on logout
        navigate('/');
      };
      const handleRegistration=() =>{
        navigate('/registration');
      }
  return (
    <div className="container">
      {/* Sidebar Section */}
      <div className="sidebar">
        <h2>Menu</h2>
        <ul>
        <li> <button onClick={handleRegistration}>Registration</button></li>
        <li>
            <button onClick={handlelogin}>Course Exemption Form</button></li>
        <li>
            <button onClick={handleLogout}>Logout</button>
        </li>
        </ul>
      </div>

      {/* Main Content Section */}
      <div className="main-content">
        <h1>Registration Form</h1>
        <form className="registration-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number</label>
            <input type="text" id="rollNumber" placeholder="Enter your roll number" />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select id="department">
              <option value="informationTechnology">Information Technology</option>
              <option value="computerScience">Computer Science</option>
              <option value="electronicsAndCommunication">Electronics and Communication</option>
              <option value="mechatronics">Mechatronics</option>
              <option value="civil">Civil</option>
            </select>
          </div>
          <div className='semester'>
            <label htmlFor="semester">Semester</label>
            <select id="semester">
              <option value="1">Semester 3</option>
              <option value="2">Semester 4</option>
              <option value="3">Semester 5</option>
              <option value="4">Semester 6</option>
            </select>            
          </div>
          <div className='done'>
          <button className='register' type="submit">Register</button>
          <button className='cancel' type="reset">Cancel</button>
          </div>        
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
