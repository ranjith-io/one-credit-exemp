import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css'; // Make sure the CSS file is linked

function AdminPage() {
  const navigate = useNavigate();

  // Sample student details for demonstration
  const allStudents = [
    { name: 'John Doe', rollNumber: '7376221MC137', semester: '5th' },
    { name: 'Jane Smith', rollNumber: '7376221MC138', semester: '6th' },
    { name: 'Alice Brown', rollNumber: '7376221MC139', semester: '4th' },
    { name: 'Bob White', rollNumber: '7376221MC140', semester: '3rd' },
    { name: 'Charlie Ginger', rollNumber: '7376221MC141', semester: '5th' },
    { name: 'Diana Black', rollNumber: '7376221MC142', semester: '2nd' },
    // Add more students here if needed
  ];

  // For pagination - Show 3 students per page
  const studentsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const handleLogout = () => {
    navigate('/'); // Redirect to the login page
  };

  const handleApprove = (rollNumber) => {
    console.log(`Approved exemption for ${rollNumber}`);
    // Handle approval logic here
  };

  const handleReject = (rollNumber) => {
    console.log(`Rejected exemption for ${rollNumber}`);
    // Handle rejection logic here
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

  return (
    <div className="container">
      {/* Sidebar Section */}
      <div className="sidebar">
        <h2>Admin Menu</h2>
        <ul>
          <li>
            <button onClick={() => {}}>One Credit Exemption Requests</button>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>

      {/* Main Content Section */}
      <div className="main-content">
        <h1>Exemption Requests</h1>

        {/* Display student details in a simple list */}
        <div className="exemption-list">
          {currentStudents.map((student, index) => (
            <div key={index} className="student-card">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Roll Number:</strong> {student.rollNumber}</p>
              <p><strong>Semester:</strong> {student.semester}</p>

              <div className="action-buttons">
                <button className='Approve' onClick={() => handleApprove(student.rollNumber)}>
                  Approve
                </button>
                <button className='Reject' onClick={() => handleReject(student.rollNumber)}>
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

export default AdminPage;
