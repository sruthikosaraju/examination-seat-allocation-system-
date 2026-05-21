import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Components
import Login from "./Components/Login";
import StudentLogin from "./Components/StudentLogin";
import StudentDashboard from "./Components/StudentDashboard";

// Pages
import Home from "./pages/Home";
import UploadPage from "./pages/UploadPage";
import ExamHallsPage from "./pages/ExamHallsPage";
import AllocateSeatsPage from "./pages/AllocateSeatsPage";
import SeatingChartPage from "./pages/SeatingChartPage";
import GenerateReportsPage from "./pages/GenerateReportsPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const [student, setStudent] = useState(null);

  const handleLoginSuccess = (email) => {
    console.log("Login successful:", email);
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    setIsLoggedIn(false);
    setUserEmail("");
  };

  const handleStudentLoginSuccess = (studentData) => {
    setStudent(studentData);
    setIsStudentLoggedIn(true);
  };

  const handleStudentLogout = () => {
    setStudent(null);
    setIsStudentLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        {/* Admin Login */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* Admin Home */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Home userEmail={userEmail} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Upload */}
        <Route
          path="/upload"
          element={
            isLoggedIn ? (
              <UploadPage userEmail={userEmail} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Exam Halls */}
        <Route
          path="/exam-halls"
          element={
            isLoggedIn ? (
              <ExamHallsPage userEmail={userEmail} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Allocate Seats */}
        <Route
          path="/allocate"
          element={
            isLoggedIn ? (
              <AllocateSeatsPage userEmail={userEmail} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Seating Chart */}
        <Route
          path="/seating-chart"
          element={
            isLoggedIn ? (
              <SeatingChartPage userEmail={userEmail} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Reports */}
        <Route
          path="/reports"
          element={
            isLoggedIn ? (
              <GenerateReportsPage userEmail={userEmail} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={
            isLoggedIn ? (
              <SettingsPage userEmail={userEmail} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Student Login */}
        <Route
          path="/student-login"
          element={
            isStudentLoggedIn ? (
              <Navigate to="/student-dashboard" />
            ) : (
              <StudentLogin onStudentLoginSuccess={handleStudentLoginSuccess} />
            )
          }
        />

        {/* Student Dashboard */}
        <Route
          path="/student-dashboard"
          element={
            isStudentLoggedIn ? (
              <StudentDashboard
                student={student}
                onLogout={handleStudentLogout}
              />
            ) : (
              <Navigate to="/student-login" />
            )
          }
        />

        {/* Default */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
