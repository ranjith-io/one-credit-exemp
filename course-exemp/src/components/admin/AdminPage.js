import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPage.css'; // Make sure the CSS file is linked

function AdminPage() {
  const navigate = useNavigate();

  // Sample student details for demonstration before API Integration
  // const allStudents = [
  //   { name: 'Ranjith ', rollNumber: '7376221MC137', semester: '5th' },
  //   { name: 'Kani ', rollNumber: '7376221MC138', semester: '6th' },
  //   { name: 'Pravin ', rollNumber: '7376221MC139', semester: '4th' },
  //   { name: 'Sivasurya ', rollNumber: '7376221MC140', semester: '3rd' },
  //   { name: 'Kaviyan ', rollNumber: '7376221MC141', semester: '5th' },
  //   { name: 'Kathiresan ', rollNumber: '7376221MC142', semester: '2nd' },
  // ];
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/exemption');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudents();
  }, []);

  const studentsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const handleLogout = () => {
    navigate('/'); // Redirect to the login page
  };

  const handleApprove = async (id, type) => {
    try {
      console.log(`Approved ${type} request for ${id}`);
      const url = `http://localhost:5000/exemption/${id}`;
      await axios.patch(url, { status: 'approved' });
      setStudents(students.filter(student => student._id !== id)); // Remove approved student from UI
      alert(`Approval successfull!`);
    } catch (error) {
      console.error('Approval failed:', error);
      alert('Failed to approve request.');
    }
  };

  const handleReject = async (id, type) => {
    try {
      console.log(`Rejected ${type} request for ${id}`);
      const url = `http://localhost:5000/exemption/${id}`;
      await axios.patch(url, { status: 'rejected' });
      setStudents(students.filter(student => student._id !== id)); // Remove approved student from UI
      alert(`Rejection successfull!`);
    } catch (error) {
      console.error('Rejection failed:', error);
      alert('Failed to reject request.');
    }
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const nextPage = () => {
    if (currentPage < Math.ceil(students.length / studentsPerPage)) {
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
            <button onClick={() => {}}>One Credit Exemption Requests</button>
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
        <h1>Exemption Requests</h1>

        {/* Display student details in a simple list */}
        <div className="exemption-list">
          {currentStudents.map((student, index) => (
            <div key={index} className="student-card">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Roll Number:</strong> {student.rollNumber}</p>
              <p><strong>Department:</strong> {student.department}</p>

              <div className="action-buttons">
                <button className='Approve' onClick={() => handleApprove(student._id,'exemption')}>
                  Approve
                </button>
                <button className='Reject' onClick={() => handleReject(student._id,'exemption')}>
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
            disabled={currentPage >= Math.ceil(students.length / studentsPerPage)}
            className={currentPage >= Math.ceil(students.length / studentsPerPage) ? 'disabled' : ''}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
