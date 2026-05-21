import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard({ student, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("student");
    onLogout();
    navigate("/student-login");
  };

  return (
    <div className="student-dashboard">
      <div className="student-dashboard-header">
        <div>
          <h1>Welcome, {student?.name}</h1>
          <p>Your exam seating details are listed below.</p>
        </div>

        <button onClick={handleLogout} className="student-logout-btn">
          Logout
        </button>
      </div>

      <div className="student-info-grid">
        <div className="student-info-card">
          <h3>Student ID</h3>
          <p>{student?.studentId}</p>
        </div>

        <div className="student-info-card">
          <h3>Roll Number</h3>
          <p>{student?.rollNumber}</p>
        </div>

        <div className="student-info-card">
          <h3>Department</h3>
          <p>{student?.department}</p>
        </div>

        <div className="student-info-card">
          <h3>Email</h3>
          <p>{student?.email}</p>
        </div>
      </div>

      <div className="seat-card">
        <h2>Seat Allocation</h2>

        {student?.hall && student?.seat ? (
          <div className="seat-details">
            <p>
              <strong>Exam Hall:</strong> {student.hall}
            </p>
            <p>
              <strong>Seat Number:</strong> {student.seat}
            </p>
          </div>
        ) : (
          <p className="not-allocated">Seat is not allocated yet.</p>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
