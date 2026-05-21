import { useState } from 'react'
import './Upload.css'

function Upload() {
  const [file, setFile] = useState(null)
  const [students, setStudents] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [fileName, setFileName] = useState('')

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0]
    setError('')
    setSuccess('')

    if (!uploadedFile) {
      return
    }

    // Check file type
    const fileType = uploadedFile.name.split('.').pop().toLowerCase()
    if (fileType !== 'csv' && fileType !== 'xlsx' && fileType !== 'xls') {
      setError('Please upload a CSV or Excel file (.csv, .xlsx, .xls)')
      return
    }

    // Check file size (max 5MB)
    if (uploadedFile.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    setFile(uploadedFile)
    setFileName(uploadedFile.name)
  }

  const parseCSV = (text) => {
    const lines = text.split('\n')
    const headers = lines[0].split(',').map(h => h.trim())
    
    const data = []
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '') continue
      
      const values = lines[i].split(',').map(v => v.trim())
      const row = {}
      
      headers.forEach((header, index) => {
        row[header] = values[index] || ''
      })
      
      data.push(row)
    }
    
    return data
  }

  const handleUpload = () => {
    if (!file) {
      setError('Please select a file first')
      return
    }

    const reader = new FileReader()
    
    reader.onload = (event) => {
      try {
        const fileType = file.name.split('.').pop().toLowerCase()
        
        if (fileType === 'csv') {
          const text = event.target.result
          const data = parseCSV(text)
          
          if (data.length === 0) {
            setError('File is empty or has no valid data')
            return
          }

          // Validate required columns
          const requiredColumns = ['studentId', 'name', 'rollNumber', 'department']
          const fileColumns = Object.keys(data[0])
          
          const missingColumns = requiredColumns.filter(col => !fileColumns.includes(col))
          if (missingColumns.length > 0) {
            setError(`Missing required columns: ${missingColumns.join(', ')}`)
            return
          }

          setStudents(data)
          setSuccess(`Successfully loaded ${data.length} students from the file!`)
        } else {
          // For Excel files, we'll show a message for now
          setError('Excel file support coming soon! Please use CSV format for now.')
        }
      } catch (err) {
        setError('Error reading file: ' + err.message)
      }
    }

    reader.readAsText(file)
  }

  const handleSaveToDatabase = () => {
    if (students.length === 0) {
      setError('No student data to save. Please upload a file first.')
      return
    }

    // Simulate saving to database
    console.log('Saving students:', students)
    setSuccess(`Successfully saved ${students.length} students to the database!`)
    
    // Reset after 2 seconds
    setTimeout(() => {
      setFile(null)
      setFileName('')
      setStudents([])
      setSuccess('')
    }, 2000)
  }

  const handleReset = () => {
    setFile(null)
    setFileName('')
    setStudents([])
    setError('')
    setSuccess('')
  }

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h1>📤 Upload Student Data</h1>
        <p>Upload a CSV or Excel file with student information</p>
      </div>

      <div className="upload-content">
        {/* File Upload Section */}
        <div className="upload-section">
          <div className="upload-box">
            <div className="upload-icon">📁</div>
            <h3>Select Your File</h3>
            <p>Drag and drop your CSV/Excel file here or click to browse</p>
            
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              accept=".csv,.xlsx,.xls"
              className="file-input"
            />
            
            <label htmlFor="fileInput" className="file-label">
              Choose File
            </label>

            {fileName && (
              <div className="file-name">
                ✅ Selected: <strong>{fileName}</strong>
              </div>
            )}
          </div>

          {/* Error and Success Messages */}
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {/* Action Buttons */}
          <div className="upload-actions">
            <button 
              onClick={handleUpload}
              className="btn btn-primary"
              disabled={!file}
            >
              Preview Data
            </button>
            <button 
              onClick={handleReset}
              className="btn btn-secondary"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Data Preview Section */}
        {students.length > 0 && (
          <div className="preview-section">
            <h2>Data Preview ({students.length} students)</h2>
            
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Roll Number</th>
                    <th>Department</th>
                  </tr>
                </thead>
                <tbody>
                  {students.slice(0, 10).map((student, index) => (
                    <tr key={index}>
                      <td>{student.studentId}</td>
                      <td>{student.name}</td>
                      <td>{student.rollNumber}</td>
                      <td>{student.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {students.length > 10 && (
              <p className="more-data">
                Showing 10 of {students.length} students. 
                Scroll to see more data in the table above.
              </p>
            )}

            {/* Save Button */}
            <div className="save-section">
              <button 
                onClick={handleSaveToDatabase}
                className="btn btn-success"
              >
                💾 Save All {students.length} Students to Database
              </button>
            </div>
          </div>
        )}

        {/* Instructions Section */}
        {students.length === 0 && (
          <div className="instructions-section">
            <h2>📋 File Format Instructions</h2>
            <p>Your CSV file should have the following columns:</p>
            
            <div className="format-table">
              <div className="format-row">
                <div className="format-cell"><strong>studentId</strong></div>
                <div className="format-cell">Unique student ID (e.g., STU001)</div>
              </div>
              <div className="format-row">
                <div className="format-cell"><strong>name</strong></div>
                <div className="format-cell">Student's full name (e.g., John Doe)</div>
              </div>
              <div className="format-row">
                <div className="format-cell"><strong>rollNumber</strong></div>
                <div className="format-cell">Roll number (e.g., 101, 102, etc.)</div>
              </div>
              <div className="format-row">
                <div className="format-cell"><strong>department</strong></div>
                <div className="format-cell">Department (e.g., CSE, ECE, ME)</div>
              </div>
            </div>

            <p className="example-text"><strong>Example CSV Format:</strong></p>
            <div className="code-block">
              <pre>
{`studentId,name,rollNumber,department
STU001,John Doe,101,CSE
STU002,Jane Smith,102,ECE
STU003,Mike Johnson,103,ME`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Upload