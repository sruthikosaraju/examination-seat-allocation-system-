import { useState } from 'react'
import './ExamHalls.css'

function ExamHalls() {
  const [halls, setHalls] = useState([
    { id: 1, name: 'Hall A', capacity: 50, floor: '1st' },
    { id: 2, name: 'Hall B', capacity: 40, floor: '1st' },
    { id: 3, name: 'Hall C', capacity: 60, floor: '2nd' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    floor: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.name.trim()) {
      setError('Hall name is required')
      return
    }

    if (!formData.capacity || formData.capacity <= 0) {
      setError('Capacity must be a positive number')
      return
    }

    if (!formData.floor.trim()) {
      setError('Floor is required')
      return
    }

    if (editingId) {
      setHalls(
        halls.map((hall) =>
          hall.id === editingId
            ? {
                ...hall,
                name: formData.name,
                capacity: parseInt(formData.capacity),
                floor: formData.floor,
              }
            : hall
        )
      )
      setSuccess('Exam hall updated successfully!')
      setEditingId(null)
    } else {
      const newHall = {
        id: Math.max(...halls.map((h) => h.id), 0) + 1,
        name: formData.name,
        capacity: parseInt(formData.capacity),
        floor: formData.floor,
      }
      setHalls([...halls, newHall])
      setSuccess('Exam hall added successfully!')
    }

    setFormData({ name: '', capacity: '', floor: '' })
    setShowForm(false)
  }

  const handleEdit = (hall) => {
    setEditingId(hall.id)
    setFormData({
      name: hall.name,
      capacity: hall.capacity.toString(),
      floor: hall.floor,
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this exam hall?')) {
      setHalls(halls.filter((hall) => hall.id !== id))
      setSuccess('Exam hall deleted successfully!')
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({ name: '', capacity: '', floor: '' })
    setError('')
  }

  return (
    <div className="exam-halls-container">
      <div className="halls-header">
        <h1>🏛️ Manage Exam Halls</h1>
        <p>Add, edit, or delete exam halls and their capacity</p>
      </div>

      <div className="form-section">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-add"
          >
            ➕ Add New Exam Hall
          </button>
        ) : (
          <div className="form-box">
            <h2>{editingId ? 'Edit Exam Hall' : 'Add New Exam Hall'}</h2>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="name">Hall Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Hall A, Hall B"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="capacity">Capacity</label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  placeholder="e.g., 50, 100"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="floor">Floor</label>
                <input
                  type="text"
                  id="floor"
                  name="floor"
                  value={formData.floor}
                  onChange={handleInputChange}
                  placeholder="e.g., 1st, 2nd, 3rd"
                  className="form-input"
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingId ? '💾 Update Hall' : '➕ Add Hall'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-secondary"
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {success && <div className="success-message">{success}</div>}

      <div className="table-section">
        <h2>All Exam Halls ({halls.length})</h2>

        {halls.length === 0 ? (
          <div className="no-data">
            <p>No exam halls added yet. Click "Add New Exam Hall" to get started.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="halls-table">
              <thead>
                <tr>
                  <th>Hall Name</th>
                  <th>Capacity</th>
                  <th>Floor</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {halls.map((hall) => (
                  <tr key={hall.id}>
                    <td>{hall.name}</td>
                    <td>{hall.capacity} students</td>
                    <td>{hall.floor} Floor</td>
                    <td>
                      <button
                        onClick={() => handleEdit(hall)}
                        className="btn-action btn-edit"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(hall.id)}
                        className="btn-action btn-delete"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExamHalls