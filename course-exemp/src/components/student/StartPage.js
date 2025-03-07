import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './StartPage.css';

function StartPage() {
  // const [firstName, setFirstName] = useState('');
  // const [rollNumber, setRollNumber] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function for logout
  // const [selectedDepartment, setSelectedDepartment] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    department: '',
    course1: '',
    course2: '',
    course3: '',
  });
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response =await axios.post(`${process.env.REACT_APP_API}/exemption`,formData)
      console.log('Responsee:', response.data);
      alert('Submission successful!');
    }
    catch(error){
      console.error('Error:', error);
      alert('Submission failed!');
    }
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    }
  )};

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
        <form className="exemption-form" onSubmit={handleSubmit}>
          {/* Basic Information Section */}
          <div className='Student'>
          <h2>Student details</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input required type="text" id="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number</label>
            <input type="text" id="rollNumber" value={formData.rollNumber} onChange={handleInputChange} placeholder="Ex: 7376221MC137" />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select required id="department" value={formData.department} onChange={(e) => {
              handleInputChange(e);
              // setSelectedDepartment(e.target.value);
              }}>
              <option value=''>Select Department</option>
              <option value="IT">Information Technology</option>
              <option value="ECE">Electronics and Communication Engineering</option>
              <option value="CSE">Computer Science and Engineering</option>
              <option value="ME">Mechatronics</option>
              <option value="CE">Civil Engineering</option>
            </select>
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
            <input required type="text" id="course1" value={formData.course1} onChange={handleInputChange} placeholder="Course code" />
          </div>

          {/* Second Course */}
          <div className="form-group">
            <label htmlFor="secondCourseTitle">One Credit Title 2</label>
            <input type="text" id="secondCourseTitle" placeholder="Title" />
          </div>
          <div className="form-group">
            <label htmlFor="secondCourseCode">One Credit Course Code 2</label>
            <input required type="text" id="course2"value={formData.course2} onChange={handleInputChange} placeholder="Course code" />
          </div>

          {/* Third Course */}
          <div className="form-group">
            <label htmlFor="thirdCourseTitle">One Credit Title 3</label>
            <input type="text" id="thirdCourseTitle" placeholder="Title" />
          </div>
          <div className="form-group">
            <label htmlFor="thirdCourseCode">One Credit Course Code 3</label>
            <input required type="text" id="course3"value={formData.course3} onChange={handleInputChange} placeholder="Course code" />
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