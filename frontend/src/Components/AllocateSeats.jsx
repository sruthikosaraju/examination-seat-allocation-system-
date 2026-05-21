import { useState } from 'react'
import './AllocateSeats.css'

function AllocateSeats() {
  const [students] = useState([
    { id: 1, studentId: 'STU001', name: 'John Doe', rollNumber: '101', department: 'CSE' },
    { id: 2, studentId: 'STU002', name: 'Jane Smith', rollNumber: '102', department: 'ECE' },
    { id: 3, studentId: 'STU003', name: 'Mike Johnson', rollNumber: '103', department: 'ME' },
    { id: 4, studentId: 'STU004', name: 'Sarah Williams', rollNumber: '104', department: 'CSE' },
    { id: 5, studentId: 'STU005', name: 'Tom Brown', rollNumber: '105', department: 'ME' },
  ])

  const [halls] = useState([
    { id: 1, name: 'Hall A', capacity: 50, currentAllocation: 0 },
    { id: 2, name: 'Hall B', capacity: 40, currentAllocation: 0 },
    { id: 3, name: 'Hall C', capacity: 60, currentAllocation: 0 },
  ])

  const [allocations, setAllocations] = useState([])
  const [isAllocated, setIsAllocated] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleAllocate = () => {
    setError('')
    setSuccess('')

    if (students.length === 0) {
      setError('No students found. Please upload student data first.')
      return
    }

    if (halls.length === 0) {
      setError('No exam halls found. Please add exam halls first.')
      return
    }

    // Simple allocation algorithm
    const newAllocations = []
    let hallIndex = 0

    students.forEach((student) => {
      const currentHall = halls[hallIndex]
      
      newAllocations.push({
        studentId: student.studentId,
        name: student.name,
        rollNumber: student.rollNumber,
        department: student.department,
        assignedHall: currentHall.name,
        seatNumber: (hallIndex + 1) * 100 + (newAllocations.filter(a => a.assignedHall === currentHall.name).length + 1),
      })

      // Move to next hall if current is full
      const studentsInCurrentHall = newAllocations.filter(a => a.assignedHall === currentHall.name).length
      if (studentsInCurrentHall >= currentHall.capacity && hallIndex < halls.length - 1) {
        hallIndex++
      }
    })

    setAllocations(newAllocations)
    setIsAllocated(true)
    setSuccess(`Successfully allocated ${newAllocations.length} students to exam halls!`)
  }

  const handleReset = () => {
    setAllocations([])
    setIsAllocated(false)
    setSuccess('')
    setError('')
  }

  const getHallStats = () => {
    const stats = {}
    halls.forEach(hall => {
      stats[hall.name] = {
        total: hall.capacity,
        allocated: allocations.filter(a => a.assignedHall === hall.name).length,
      }
    })
    return stats
  }

  const hallStats = getHallStats()

  return (
    <div className="allocate-container">
      <div className="allocate-header">
        <h1>🪑 Allocate Seats</h1>
        <p>Automatically assign students to exam halls</p>
      </div>

      <div className="allocate-content">
        {/* Info Section */}
        <div className="info-section">
          <div className="info-card">
            <div className="info-number">{students.length}</div>
            <div className="info-label">Total Students</div>
          </div>
          <div className="info-card">
            <div className="info-number">{halls.length}</div>
            <div className="info-label">Exam Halls</div>
          </div>
          <div className="info-card">
            <div className="info-number">{allocations.length}</div>
            <div className="info-label">Allocated</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-section">
          {!isAllocated ? (
            <button onClick={handleAllocate} className="btn btn-allocate">
              🎯 Allocate Students to Halls
            </button>
          ) : (
            <button onClick={handleReset} className="btn btn-reset">
              🔄 Reset Allocation
            </button>
          )}
        </div>

        {/* Messages */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {/* Hall Statistics */}
        {isAllocated && (
          <div className="stats-section">
            <h2>Hall Allocation Statistics</h2>
            <div className="stats-grid">
              {halls.map((hall) => (
                <div key={hall.id} className="stat-card">
                  <h3>{hall.name}</h3>
                  <div className="stat-content">
                    <div className="stat-item">
                      <span className="stat-label">Capacity:</span>
                      <span className="stat-value">{hall.capacity}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Allocated:</span>
                      <span className="stat-value" style={{ color: '#2e7d32' }}>
                        {hallStats[hall.name]?.allocated || 0}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Available:</span>
                      <span className="stat-value" style={{ color: '#1976d2' }}>
                        {hallStats[hall.name]?.total - (hallStats[hall.name]?.allocated || 0)}
                      </span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${((hallStats[hall.name]?.allocated || 0) / hall.capacity) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Allocation Results Table */}
        {isAllocated && allocations.length > 0 && (
          <div className="results-section">
            <h2>Seat Allocation Results ({allocations.length} students)</h2>
            <div className="table-container">
              <table className="allocation-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Roll Number</th>
                    <th>Department</th>
                    <th>Assigned Hall</th>
                    <th>Seat Number</th>
                  </tr>
                </thead>
                <tbody>
                  {allocations.map((allocation, index) => (
                    <tr key={index}>
                      <td>{allocation.studentId}</td>
                      <td>{allocation.name}</td>
                      <td>{allocation.rollNumber}</td>
                      <td>{allocation.department}</td>
                      <td>
                        <span className="hall-badge">{allocation.assignedHall}</span>
                      </td>
                      <td className="seat-number">{allocation.seatNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllocateSeats