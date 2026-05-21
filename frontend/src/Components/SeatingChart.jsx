import { useState } from 'react'
import './SeatingChart.css'

function SeatingChart() {
  const [selectedHall, setSelectedHall] = useState(1)

  const halls = [
    { id: 1, name: 'Hall A', capacity: 50, rows: 5, cols: 10 },
    { id: 2, name: 'Hall B', capacity: 40, rows: 4, cols: 10 },
    { id: 3, name: 'Hall C', capacity: 60, rows: 6, cols: 10 },
  ]

  // Sample seating data
  const seatingData = {
    1: [
      { seatNumber: 101, studentName: 'John Doe', studentId: 'STU001', status: 'occupied' },
      { seatNumber: 102, studentName: 'Jane Smith', studentId: 'STU002', status: 'occupied' },
      { seatNumber: 103, studentName: 'Mike Johnson', studentId: 'STU003', status: 'occupied' },
      { seatNumber: 105, studentName: 'Sarah Williams', studentId: 'STU004', status: 'occupied' },
      { seatNumber: 201, studentName: 'Tom Brown', studentId: 'STU005', status: 'occupied' },
    ],
    2: [
      { seatNumber: 201, studentName: 'Alice Cooper', studentId: 'STU006', status: 'occupied' },
      { seatNumber: 202, studentName: 'Bob Dylan', studentId: 'STU007', status: 'occupied' },
    ],
    3: [
      { seatNumber: 301, studentName: 'Charlie Brown', studentId: 'STU008', status: 'occupied' },
      { seatNumber: 302, studentName: 'Diana Prince', studentId: 'STU009', status: 'occupied' },
      { seatNumber: 303, studentName: 'Edward Norton', studentId: 'STU010', status: 'occupied' },
    ],
  }

  const currentHall = halls.find(h => h.id === selectedHall)
  const occupiedSeats = seatingData[selectedHall] || []
  const occupiedSeatNumbers = occupiedSeats.map(s => s.seatNumber)

  // Generate seat grid
  const generateSeats = () => {
    const seats = []
    for (let row = 1; row <= currentHall.rows; row++) {
      for (let col = 1; col <= currentHall.cols; col++) {
        const seatNumber = row * 100 + col
        const isOccupied = occupiedSeatNumbers.includes(seatNumber)
        const student = occupiedSeats.find(s => s.seatNumber === seatNumber)
        
        seats.push({
          seatNumber,
          occupied: isOccupied,
          student: student || null,
          row,
          col,
        })
      }
    }
    return seats
  }

  const allSeats = generateSeats()
  const occupiedCount = occupiedSeatNumbers.length
  const emptyCount = allSeats.length - occupiedCount

  return (
    <div className="seating-chart-container">
      <div className="chart-header">
        <h1>📊 View Seating Chart</h1>
        <p>View hall-wise seating arrangements</p>
      </div>

      <div className="chart-content">
        {/* Hall Selector */}
        <div className="hall-selector">
          <h2>Select Hall</h2>
          <div className="hall-buttons">
            {halls.map((hall) => (
              <button
                key={hall.id}
                onClick={() => setSelectedHall(hall.id)}
                className={`hall-btn ${selectedHall === hall.id ? 'active' : ''}`}
              >
                {hall.name}
                <span className="capacity">{hall.capacity} seats</span>
              </button>
            ))}
          </div>
        </div>

        {/* Hall Statistics */}
        <div className="hall-stats">
          <div className="stat-box">
            <div className="stat-icon">🪑</div>
            <div className="stat-info">
              <div className="stat-label">Total Seats</div>
              <div className="stat-value">{currentHall.capacity}</div>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <div className="stat-label">Occupied</div>
              <div className="stat-value" style={{ color: '#2e7d32' }}>{occupiedCount}</div>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">⬜</div>
            <div className="stat-info">
              <div className="stat-label">Empty</div>
              <div className="stat-value" style={{ color: '#1976d2' }}>{emptyCount}</div>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">📈</div>
            <div className="stat-info">
              <div className="stat-label">Occupancy</div>
              <div className="stat-value" style={{ color: '#d32f2f' }}>
                {Math.round((occupiedCount / currentHall.capacity) * 100)}%
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="legend">
          <div className="legend-item">
            <div className="legend-box occupied"></div>
            <span>Occupied</span>
          </div>
          <div className="legend-item">
            <div className="legend-box empty"></div>
            <span>Empty</span>
          </div>
        </div>

        {/* Seating Chart Grid */}
        <div className="seating-grid-container">
          <h2>{currentHall.name} - Seating Chart</h2>
          <div className="seating-grid">
            {allSeats.map((seat) => (
              <div
                key={seat.seatNumber}
                className={`seat ${seat.occupied ? 'occupied' : 'empty'}`}
                title={
                  seat.occupied
                    ? `${seat.student.studentName} (${seat.student.studentId})`
                    : `Seat ${seat.seatNumber}`
                }
              >
                <span className="seat-number">{seat.seatNumber}</span>
                {seat.occupied && (
                  <div className="seat-tooltip">
                    <strong>{seat.student.studentName}</strong>
                    <br />
                    {seat.student.studentId}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Occupied Students List */}
        {occupiedCount > 0 && (
          <div className="students-list">
            <h2>Allocated Students in {currentHall.name}</h2>
            <div className="table-container">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Seat Number</th>
                    <th>Student Name</th>
                    <th>Student ID</th>
                  </tr>
                </thead>
                <tbody>
                  {occupiedSeats.map((student, index) => (
                    <tr key={index}>
                      <td className="seat-td">{student.seatNumber}</td>
                      <td>{student.studentName}</td>
                      <td>{student.studentId}</td>
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

export default SeatingChart