import { useState } from 'react'
import { Link } from "react-router-dom";
import './Login.css'
import { loginUser } from '../api/api'


function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      setLoading(true)

      const res = await loginUser({
        email,
        password,
      })

      console.log("✅ LOGIN SUCCESS:", res.data)

      // Save token
      localStorage.setItem("token", res.data.token)

      // Redirect / update state
      onLoginSuccess(res.data.email)

    } catch (err) {
      console.log(err)
      setError("❌ Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>📚 Exam Seating System</h1>
          <p>Admin Login</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

       <div className="login-footer">
  <p>Demo Credentials:</p>
  <p><strong>Email:</strong> admin@exam.com</p>
  <p><strong>Password:</strong> admin123</p>

  <p style={{ marginTop: "15px" }}>Are you a student?</p>
  <Link to="/student-login">Student Login</Link>
</div>

      </div>
    </div>
  )
}

export default Login