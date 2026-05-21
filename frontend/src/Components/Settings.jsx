import { useState } from 'react'
import './Settings.css'

function Settings() {
  const [settings, setSettings] = useState({
    systemName: 'Exam Seating System',
    institutionName: 'ABC University',
    examDuration: 180,
    breakTime: 15,
    allowLateEntry: false,
    enableBiometric: false,
    emailNotifications: true,
    systemTheme: 'light',
    autoBackup: true,
    backupFrequency: 'daily',
  })

  const [activeTab, setActiveTab] = useState('general')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSaveSettings = () => {
    setError('')
    setSuccess('')

    if (!settings.systemName.trim()) {
      setError('System name is required')
      return
    }

    if (!settings.institutionName.trim()) {
      setError('Institution name is required')
      return
    }

    if (settings.examDuration <= 0) {
      setError('Exam duration must be greater than 0')
      return
    }

    setSuccess('✅ Settings saved successfully!')
    setIsEditing(false)

    setTimeout(() => {
      setSuccess('')
    }, 3000)
  }

  const handleReset = () => {
    setIsEditing(false)
    setError('')
  }

  const systemInfo = {
    version: '1.0.0',
    buildDate: '2026-04-04',
    lastBackup: '2026-04-04 10:30 AM',
    totalUsers: 15,
    totalStudents: 250,
    totalHalls: 3,
    diskUsage: '245 MB / 1 GB',
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>⚙️ Settings</h1>
        <p>Configure system settings and preferences</p>
      </div>

      <div className="settings-content">
        {/* Tabs */}
        <div className="settings-tabs">
          <button
            className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            🏢 General
          </button>
          <button
            className={`tab-btn ${activeTab === 'exam' ? 'active' : ''}`}
            onClick={() => setActiveTab('exam')}
          >
            📝 Exam Settings
          </button>
          <button
            className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            🔔 Notifications
          </button>
          <button
            className={`tab-btn ${activeTab === 'backup' ? 'active' : ''}`}
            onClick={() => setActiveTab('backup')}
          >
            💾 Backup
          </button>
          <button
            className={`tab-btn ${activeTab === 'system' ? 'active' : ''}`}
            onClick={() => setActiveTab('system')}
          >
            ℹ️ System Info
          </button>
        </div>

        {/* Messages */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {/* Tab Content */}
        <div className="tab-content">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="settings-form">
              <h2>General Settings</h2>
              <div className="form-group">
                <label htmlFor="systemName">System Name</label>
                <input
                  type="text"
                  id="systemName"
                  name="systemName"
                  value={settings.systemName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="institutionName">Institution Name</label>
                <input
                  type="text"
                  id="institutionName"
                  name="institutionName"
                  value={settings.institutionName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="systemTheme">System Theme</label>
                <select
                  id="systemTheme"
                  name="systemTheme"
                  value={settings.systemTheme}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-input"
                >
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                  <option value="auto">Auto (System)</option>
                </select>
              </div>

              <div className="form-actions">
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="btn btn-edit">
                    ✏️ Edit Settings
                  </button>
                ) : (
                  <>
                    <button onClick={handleSaveSettings} className="btn btn-save">
                      💾 Save Settings
                    </button>
                    <button onClick={handleReset} className="btn btn-cancel">
                      ❌ Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Exam Settings */}
          {activeTab === 'exam' && (
            <div className="settings-form">
              <h2>Exam Settings</h2>
              <div className="form-group">
                <label htmlFor="examDuration">Exam Duration (minutes)</label>
                <input
                  type="number"
                  id="examDuration"
                  name="examDuration"
                  value={settings.examDuration}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="breakTime">Break Time Between Exams (minutes)</label>
                <input
                  type="number"
                  id="breakTime"
                  name="breakTime"
                  value={settings.breakTime}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>

              <div className="form-group checkbox">
                <label htmlFor="allowLateEntry">
                  <input
                    type="checkbox"
                    id="allowLateEntry"
                    name="allowLateEntry"
                    checked={settings.allowLateEntry}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  <span>Allow Late Entry (5 minutes after exam starts)</span>
                </label>
              </div>

              <div className="form-group checkbox">
                <label htmlFor="enableBiometric">
                  <input
                    type="checkbox"
                    id="enableBiometric"
                    name="enableBiometric"
                    checked={settings.enableBiometric}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  <span>Enable Biometric Verification</span>
                </label>
              </div>

              <div className="form-actions">
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="btn btn-edit">
                    ✏️ Edit Settings
                  </button>
                ) : (
                  <>
                    <button onClick={handleSaveSettings} className="btn btn-save">
                      💾 Save Settings
                    </button>
                    <button onClick={handleReset} className="btn btn-cancel">
                      ❌ Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="settings-form">
              <h2>Notification Settings</h2>
              
              <div className="notification-cards">
                <div className="notification-card">
                  <div className="notification-icon">📧</div>
                  <div className="notification-info">
                    <h3>Email Notifications</h3>
                    <p>Receive email updates about exam schedules and student allocations</p>
                  </div>
                  <div className="notification-toggle">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      name="emailNotifications"
                      checked={settings.emailNotifications}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                    <label htmlFor="emailNotifications"></label>
                  </div>
                </div>

                <div className="notification-card">
                  <div className="notification-icon">🔔</div>
                  <div className="notification-info">
                    <h3>System Notifications</h3>
                    <p>Receive in-app notifications for important events</p>
                  </div>
                  <div className="notification-toggle">
                    <input
                      type="checkbox"
                      id="systemNotifications"
                      defaultChecked={true}
                      disabled={!isEditing}
                    />
                    <label htmlFor="systemNotifications"></label>
                  </div>
                </div>

                <div className="notification-card">
                  <div className="notification-icon">⏰</div>
                  <div className="notification-info">
                    <h3>Reminder Notifications</h3>
                    <p>Get reminders for upcoming exams and deadlines</p>
                  </div>
                  <div className="notification-toggle">
                    <input
                      type="checkbox"
                      id="reminderNotifications"
                      defaultChecked={true}
                      disabled={!isEditing}
                    />
                    <label htmlFor="reminderNotifications"></label>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="btn btn-edit">
                    ✏️ Edit Settings
                  </button>
                ) : (
                  <>
                    <button onClick={handleSaveSettings} className="btn btn-save">
                      💾 Save Settings
                    </button>
                    <button onClick={handleReset} className="btn btn-cancel">
                      ❌ Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Backup Settings */}
          {activeTab === 'backup' && (
            <div className="settings-form">
              <h2>Backup Settings</h2>
              
              <div className="form-group checkbox">
                <label htmlFor="autoBackup">
                  <input
                    type="checkbox"
                    id="autoBackup"
                    name="autoBackup"
                    checked={settings.autoBackup}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  <span>Enable Automatic Backup</span>
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="backupFrequency">Backup Frequency</label>
                <select
                  id="backupFrequency"
                  name="backupFrequency"
                  value={settings.backupFrequency}
                  onChange={handleInputChange}
                  disabled={!isEditing || !settings.autoBackup}
                  className="form-input"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="backup-info-box">
                <h3>Last Backup Information</h3>
                <div className="info-item">
                  <span className="info-label">Last Backup:</span>
                  <span className="info-value">{systemInfo.lastBackup}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Disk Usage:</span>
                  <span className="info-value">{systemInfo.diskUsage}</span>
                </div>
              </div>

              <div className="backup-actions">
                <button className="btn btn-backup">
                  💾 Backup Now
                </button>
                <button className="btn btn-restore">
                  🔄 Restore from Backup
                </button>
              </div>

              <div className="form-actions">
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="btn btn-edit">
                    ✏️ Edit Settings
                  </button>
                ) : (
                  <>
                    <button onClick={handleSaveSettings} className="btn btn-save">
                      💾 Save Settings
                    </button>
                    <button onClick={handleReset} className="btn btn-cancel">
                      ❌ Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* System Info */}
          {activeTab === 'system' && (
            <div className="system-info">
              <h2>System Information</h2>
              
              <div className="info-grid">
                <div className="info-card">
                  <div className="info-icon">📦</div>
                  <div className="info-details">
                    <div className="info-label">Version</div>
                    <div className="info-value">{systemInfo.version}</div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">📅</div>
                  <div className="info-details">
                    <div className="info-label">Build Date</div>
                    <div className="info-value">{systemInfo.buildDate}</div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">👥</div>
                  <div className="info-details">
                    <div className="info-label">Total Users</div>
                    <div className="info-value">{systemInfo.totalUsers}</div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">🎓</div>
                  <div className="info-details">
                    <div className="info-label">Total Students</div>
                    <div className="info-value">{systemInfo.totalStudents}</div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">🏛️</div>
                  <div className="info-details">
                    <div className="info-label">Exam Halls</div>
                    <div className="info-value">{systemInfo.totalHalls}</div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">💾</div>
                  <div className="info-details">
                    <div className="info-label">Disk Usage</div>
                    <div className="info-value">{systemInfo.diskUsage}</div>
                  </div>
                </div>
              </div>

              <div className="system-details">
                <h3>System Details</h3>
                <div className="detail-item">
                  <span>Operating System:</span>
                  <strong>Windows Server 2019</strong>
                </div>
                <div className="detail-item">
                  <span>Server:</span>
                  <strong>Node.js v18.0.0</strong>
                </div>
                <div className="detail-item">
                  <span>Frontend:</span>
                  <strong>React 18.2.0 + Vite</strong>
                </div>
                <div className="detail-item">
                  <span>Database:</span>
                  <strong>Not Connected (Local Data)</strong>
                </div>
                <div className="detail-item">
                  <span>Status:</span>
                  <strong style={{ color: '#2e7d32' }}>✅ All Systems Operational</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings