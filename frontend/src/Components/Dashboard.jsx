import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()

  const features = [
    {
      id: 1,
      title: "Upload Student Data",
      description: "Upload student information via CSV or Excel file",
      icon: "📤",
      path: "/upload"
    },
    {
      id: 2,
      title: "Manage Exam Halls",
      description: "Add, edit, or delete exam halls and their capacity",
      icon: "🏛️",
      path: "/exam-halls"
    },
    {
      id: 3,
      title: "Allocate Seats",
      description: "Automatically assign students to exam halls",
      icon: "🪑",
      path: "/allocate"
    },
    {
      id: 4,
      title: "View Seating Chart",
      description: "View hall-wise seating arrangements",
      icon: "📊",
      path: "/seating-chart"
    },
    {
      id: 5,
      title: "Generate Reports",
      description: "Download or print seating reports",
      icon: "📄",
      path: "/reports"
    },
    {
      id: 6,
      title: "Settings",
      description: "Configure system settings and preferences",
      icon: "⚙️",
      path: "/settings"
    }
  ]

  const handleAccess = (path) => {
    navigate(path)
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Select an option to get started</p>
      </div>

      <div className="features-grid">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card">
            <div className="card-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <button 
              className="card-button"
              onClick={() => handleAccess(feature.path)}
            >
              Access
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard