import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

function Header({ userEmail, onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h2>📚 Exam Seating System</h2>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/upload" className="nav-link">Upload</Link>
          <div className="user-section">
            <span className="user-email">{userEmail}</span>
            <button 
              onClick={handleLogout}
              className="nav-link logout"
              style={{ border: 'none', background: 'rgba(255, 255, 255, 0.3)', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header