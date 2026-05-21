import { useState } from 'react'
import './GenerateReports.css'

function GenerateReports() {
  const [selectedHall, setSelectedHall] = useState('all')
  const [reportType, setReportType] = useState('seating')
  const [dateRange, setDateRange] = useState('today')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const halls = [
    { id: 1, name: 'Hall A', capacity: 50, occupiedSeats: 45 },
    { id: 2, name: 'Hall B', capacity: 40, occupiedSeats: 38 },
    { id: 3, name: 'Hall C', capacity: 60, occupiedSeats: 55 },
  ]

  const reportTypes = [
    { id: 'seating', name: 'Seating Arrangement', icon: '🪑', description: 'Detailed seating layout by hall' },
    { id: 'attendance', name: 'Attendance Report', icon: '✓', description: 'Student attendance summary' },
    { id: 'statistics', name: 'Statistics Report', icon: '📊', description: 'Detailed statistics and analytics' },
    { id: 'manifest', name: 'Exam Manifest', icon: '📋', description: 'Official exam manifest document' },
  ]

  const dateRanges = [
    { id: 'today', name: 'Today' },
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'custom', name: 'Custom Range' },
  ]

  const handleGeneratePDF = () => {
    setError('')
    setSuccess('')

    if (!selectedHall) {
      setError('Please select a hall')
      return
    }

    // Simulate PDF generation
    setTimeout(() => {
      setSuccess(`✅ ${getReportTypeName()} PDF downloaded successfully!`)
    }, 1000)
  }

  const handleGenerateExcel = () => {
    setError('')
    setSuccess('')

    if (!selectedHall) {
      setError('Please select a hall')
      return
    }

    // Simulate Excel generation
    setTimeout(() => {
      setSuccess(`✅ ${getReportTypeName()} Excel file downloaded successfully!`)
    }, 1000)
  }

  const handlePrint = () => {
    setError('')
    setSuccess('')

    if (!selectedHall) {
      setError('Please select a hall')
      return
    }

    // Simulate print
    window.print()
    setSuccess(`✅ Print dialog opened for ${getReportTypeName()}`)
  }

  const getReportTypeName = () => {
    const report = reportTypes.find(r => r.id === reportType)
    return report ? report.name : 'Report'
  }

  const getReportSummary = () => {
    if (selectedHall === 'all') {
      return {
        totalStudents: halls.reduce((sum, h) => sum + h.occupiedSeats, 0),
        totalHalls: halls.length,
        totalCapacity: halls.reduce((sum, h) => sum + h.capacity, 0),
      }
    } else {
      const hall = halls.find(h => h.id.toString() === selectedHall)
      return {
        totalStudents: hall.occupiedSeats,
        totalHalls: 1,
        totalCapacity: hall.capacity,
      }
    }
  }

  const summary = getReportSummary()

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>📄 Generate Reports</h1>
        <p>Download or print seating reports</p>
      </div>

      <div className="reports-content">
        {/* Report Type Selection */}
        <div className="selection-section">
          <h2>Select Report Type</h2>
          <div className="report-types-grid">
            {reportTypes.map((report) => (
              <div
                key={report.id}
                className={`report-type-card ${reportType === report.id ? 'active' : ''}`}
                onClick={() => setReportType(report.id)}
              >
                <div className="report-icon">{report.icon}</div>
                <h3>{report.name}</h3>
                <p>{report.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hall Selection */}
        <div className="selection-section">
          <h2>Select Hall</h2>
          <div className="hall-selection">
            <label className="radio-option">
              <input
                type="radio"
                name="hall"
                value="all"
                checked={selectedHall === 'all'}
                onChange={(e) => setSelectedHall(e.target.value)}
              />
              <span>All Halls</span>
            </label>
            {halls.map((hall) => (
              <label key={hall.id} className="radio-option">
                <input
                  type="radio"
                  name="hall"
                  value={hall.id.toString()}
                  checked={selectedHall === hall.id.toString()}
                  onChange={(e) => setSelectedHall(e.target.value)}
                />
                <span>{hall.name} - {hall.occupiedSeats}/{hall.capacity} students</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range Selection */}
        <div className="selection-section">
          <h2>Date Range</h2>
          <div className="date-selection">
            {dateRanges.map((range) => (
              <label key={range.id} className="radio-option">
                <input
                  type="radio"
                  name="dateRange"
                  value={range.id}
                  checked={dateRange === range.id}
                  onChange={(e) => setDateRange(e.target.value)}
                />
                <span>{range.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Messages */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {/* Report Summary */}
        <div className="summary-section">
          <h2>Report Summary</h2>
          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-icon">👥</div>
              <div className="summary-info">
                <div className="summary-label">Total Students</div>
                <div className="summary-value">{summary.totalStudents}</div>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon">🏛️</div>
              <div className="summary-info">
                <div className="summary-label">Halls Included</div>
                <div className="summary-value">{summary.totalHalls}</div>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon">🪑</div>
              <div className="summary-info">
                <div className="summary-label">Total Capacity</div>
                <div className="summary-value">{summary.totalCapacity}</div>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon">📊</div>
              <div className="summary-info">
                <div className="summary-label">Occupancy Rate</div>
                <div className="summary-value">
                  {Math.round((summary.totalStudents / summary.totalCapacity) * 100)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="actions-section">
          <h2>Download or Print</h2>
          <div className="action-buttons">
            <button 
              onClick={handleGeneratePDF}
              className="btn btn-pdf"
            >
              📥 Download as PDF
            </button>
            <button 
              onClick={handleGenerateExcel}
              className="btn btn-excel"
            >
              📊 Download as Excel
            </button>
            <button 
              onClick={handlePrint}
              className="btn btn-print"
            >
              🖨️ Print Report
            </button>
          </div>
        </div>

        {/* Report Preview */}
        <div className="preview-section">
          <h2>Report Preview</h2>
          <div className="preview-box">
            <div className="preview-content">
              <h3>📄 {getReportTypeName()} - {selectedHall === 'all' ? 'All Halls' : `Hall ${selectedHall}`}</h3>
              <p>Date: {new Date().toLocaleDateString()}</p>
              <hr />
              
              <div className="preview-details">
                <h4>Report Details:</h4>
                <ul>
                  <li>Total Students: <strong>{summary.totalStudents}</strong></li>
                  <li>Halls Included: <strong>{summary.totalHalls}</strong></li>
                  <li>Total Capacity: <strong>{summary.totalCapacity}</strong></li>
                  <li>Occupancy Rate: <strong>{Math.round((summary.totalStudents / summary.totalCapacity) * 100)}%</strong></li>
                  <li>Report Type: <strong>{getReportTypeName()}</strong></li>
                  <li>Date Range: <strong>{dateRanges.find(r => r.id === dateRange)?.name}</strong></li>
                </ul>
              </div>

              <hr />
              <p className="preview-footer">This is a preview of the report. Click "Download as PDF" or "Download as Excel" to save the complete report.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenerateReports