import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate hook for redirecting
import './StartPage.css'; // Add styles in this file

function StartPage() {
  // const [firstName, setFirstName] = useState('');
  // const [rollNumber, setRollNumber] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function for logout

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Submitted:', { firstName, rollNumber });
  //   setFirstName('');
  //   setRollNumber('');
  // };

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
      {/* <h1>One Credit ourse Exemption</h1> */}

      <div className="main-content">
        <form className="exemption-form">
          {/* Basic Information Section */}
          <div className='Student'>
          <h2>Student details</h2>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number</label>
            <input type="text" id="rollNumber" placeholder="Ex: 7376221MC137" />
          </div>
          </div>

          {/* One Credit Course Details */}
          <h2>One Credit Course details</h2>

          {/* First Course */}
          <div className="form-group">
            <label htmlFor="firstCourseTitle">One Credit Title 1</label>
            <input type="text" id="firstCourseTitle" placeholder="Title" />
          </div>
          <div className="form-group">
            <label htmlFor="firstCourseCode">One Credit Course Code 1</label>
            <input type="text" id="firstCourseCode" placeholder="Course code" />
          </div>

          {/* Second Course */}
          <div className="form-group">
            <label htmlFor="secondCourseTitle">One Credit Title 2</label>
            <input type="text" id="secondCourseTitle" placeholder="Title" />
          </div>
          <div className="form-group">
            <label htmlFor="secondCourseCode">One Credit Course Code 2</label>
            <input type="text" id="secondCourseCode" placeholder="Course code" />
          </div>

          {/* Third Course */}
          <div className="form-group">
            <label htmlFor="thirdCourseTitle">One Credit Title 3</label>
            <input type="text" id="thirdCourseTitle" placeholder="Title" />
          </div>
          <div className="form-group">
            <label htmlFor="thirdCourseCode">One Credit Course Code 3</label>
            <input type="text" id="thirdCourseCode" placeholder="Course code" />
          </div>

          <div className='done'>
          <button className='submit' type="submit">Submit</button>
          <button className='cancel' type="reset">Cancel</button>       
          </div>        
        </form>
      </div>
    </div>
  );
}

export default StartPage;
