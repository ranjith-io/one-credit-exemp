import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css'; // Reuse the same CSS for styling

function DetailsPage() {
  const navigate = useNavigate();

  // Sample registration details for demonstration
  const allStudents = [
    { name: 'Ranjith', rollNumber: '7376221MC137', semester: '5th', courseName: 'Data Structures', department: 'CSE' },
    { name: 'Kani', rollNumber: '7376221MC138', semester: '6th', courseName: 'Operating Systems', department: 'IT' },
    { name: 'Pravin', rollNumber: '7376221MC139', semester: '4th', courseName: 'Algorithms', department: 'ECE' },
    { name: 'Sivasurya', rollNumber: '7376221MC140', semester: '3rd', courseName: 'Databases', department: 'EEE' },
    { name: 'Kaviya S', rollNumber: '7376221MC141', semester: '5th', courseName: 'Machine Learning', department: 'CSE' },
    { name: 'Kathiresan', rollNumber: '7376221MC142', semester: '2nd', courseName: 'Digital Circuits', department: 'ECE' },
  ];

  // For pagination - Show 3 students per page
  const studentsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const handleLogout = () => {
    navigate('/'); // Redirect to the login page
  };

  const handleApprove = (rollNumber) => {
    console.log(`Approved registration for ${rollNumber}`);
    // Handle approval
  };

  const handleReject = (rollNumber) => {
    console.log(`Rejected registration for ${rollNumber}`);
    // Handle rejection
  };

  // Calculate which students to display on the current page
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = allStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const nextPage = () => {
    if (currentPage < Math.ceil(allStudents.length / studentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleMenuClick = (path) => {
    navigate(path); // Navigate to the specified path
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
            <button onClick={() => {}}>Registration Details</button>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>

      {/* Main Content Section */}
      <div className="main-content">
        <h1>Registration Details</h1>

        {/* Display student details with course name and department */}
        <div className="details-list">
          {currentStudents.map((student, index) => (
            <div key={index} className="student-card">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Roll Number:</strong> {student.rollNumber}</p>
              <p><strong>Semester:</strong> {student.semester}</p>
              <p><strong>Course Name:</strong> {student.courseName}</p>
              <p><strong>Department:</strong> {student.department}</p>

              <div className="action-buttons">
                <button className="Approve" onClick={() => handleApprove(student.rollNumber)}>
                  Approve
                </button>
                <button className="Reject" onClick={() => handleReject(student.rollNumber)}>
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="pagination">
          <button 
            onClick={prevPage} 
            disabled={currentPage <= 1}
            className={currentPage <= 1 ? 'disabled' : ''}
          >
            Previous
          </button>

          <button 
            onClick={nextPage} 
            disabled={currentPage >= Math.ceil(allStudents.length / studentsPerPage)}
            className={currentPage >= Math.ceil(allStudents.length / studentsPerPage) ? 'disabled' : ''}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
