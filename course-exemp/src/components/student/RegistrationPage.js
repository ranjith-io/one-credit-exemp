import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegistrationPage.css';

function RegistrationPage() {
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    department: '',
    semester: '',
    course: '',
  });

  const departmentSemesterCourses = {
    informationTechnology: {
      3: ['Web Development', 'Data Structures', 'Networking'],
      4: ['Cloud Computing', 'Operating Systems', 'DBMS'],
      5: ['Software Engineering', 'Artificial Intelligence', 'Cyber Security'],
      6: ['Machine Learning', 'Big Data Analytics', 'IoT'],
    },
    computerScience: {
      3: ['Programming in C', 'Data Structures', 'Algorithms'],
      4: ['Operating Systems', 'Database Systems', 'Networks'],
      5: ['Artificial Intelligence', 'Machine Learning', 'Cryptography'],
        6: ['Cloud Computing', 'Blockchain', 'Quantum Computing'],
    },
    electronicsAndCommunication: {
      3: ['Digital Circuits', 'Signals & Systems', 'Basic Electronics'],
      4: ['Microprocessors', 'VLSI Design', 'Communication Systems'],
      5: ['Antenna Design', 'Wireless Communication', 'Embedded Systems'],
      6: ['Radar Systems', 'Optical Communication', 'IoT'],
    },
    mechatronics: {
      3: ['Robotics Basics', 'Material Science', 'Thermodynamics'],
      4: ['Machine Design', 'Control Systems', 'Sensors & Actuators'],
      5: ['Industrial Robotics', 'Automation Systems', 'Dynamics'],
      6: ['AI in Robotics', 'Advanced Control Systems', 'IoT in Mechatronics'],
    },
    civil: {
      3: ['Structural Analysis', 'Surveying', 'Geotechnical Engineering'],
      4: ['Transportation Engineering', 'Hydraulics', 'Concrete Technology'],
      5: ['Building Design', 'Environmental Engineering', 'Construction Planning'],
      6: ['Earthquake Engineering', 'Urban Planning', 'Sustainable Development'],
    },
  };
  console.log(process.env.REACT_APP_API);

  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setSelectedDepartment(department);
    setCourses([]); // Reset courses when department changes
  };

  const handleSemesterChange = (e) => {
    const semester = e.target.value;
    setSelectedSemester(semester);
    if (selectedDepartment && departmentSemesterCourses[selectedDepartment]) {
      setCourses(departmentSemesterCourses[selectedDepartment][semester] || []);
    } else {
      setCourses([]);
    }
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(process.env.REACT_APP_API);
      const response = await axios.post(`${process.env.REACT_APP_API}/register`,formData);
      alert('Registration successful!');
      console.log('Response:',response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed!');
    }
  };

  const handleLogin = () => {
    navigate('/start');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleRegistration = () => {
    navigate('/registration');
  };

  return (
    <div className="container">
      {/* Sidebar Section */}
      <div className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li><button onClick={handleRegistration}>Registration</button></li>
          <li><button onClick={handleLogin}>Course Exemption Form</button></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>

      {/* Main Content Section */}
      <div className="main-content">
        <h1>Registration test Form</h1>
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input required type="text" id="name" value={formData.name} onChange ={handleInputChange} placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number</label>
            <input required type="text" id="rollNumber" value={formData.rollNumber} onChange={handleInputChange} placeholder="Enter your roll number" />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select required id="department" value={selectedDepartment} onChange={(e) => {
              handleInputChange(e); // Updates the department in formData
              handleDepartmentChange(e); // Updates courses based on department
            }}>
              <option value="">Select Department</option>
              <option value="informationTechnology">Information Technology</option>
              <option value="computerScience">Computer Science</option>
              <option value="electronicsAndCommunication">Electronics and Communication</option>
              <option value="mechatronics">Mechatronics</option>
              <option value="civil">Civil</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="semester">Semester</label>
            <select required id="semester" value={selectedSemester} onChange={(e) => {
            handleInputChange(e); // Updates the semester in formData
            handleSemesterChange(e); // Updates courses based on semester
          }}>
              <option value="">Select Semester</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="courses">Courses</label>
            <select required id="course"  onChange={handleInputChange}>
              <option value=''>Select Course</option>
              {courses.map((course, index) => (
              <option key={index} value={course}>{course}</option>
              ))}
            </select>
          </div>
          <div className="done">
            <button className="register" type="submit">Register</button>
            <button className="cancel" type="reset">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
