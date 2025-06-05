import { useState } from 'react'

// Store registered users in localStorage for persistence
function getRegisteredUsers() {
  return JSON.parse(localStorage.getItem('registeredUsers') || '{}')
}
function setRegisteredUsers(users) {
  localStorage.setItem('registeredUsers', JSON.stringify(users))
}

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showRegister, setShowRegister] = useState(false)
  const [adminMode, setAdminMode] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (adminMode) {
      if (username === 'admin' && password === 'admin123') {
        onLogin('admin')
      } else {
        setError('Invalid admin credentials')
      }
    } else {
      const users = getRegisteredUsers()
      if (!users[username]) {
        setError('User not registered. Please register first.')
      } else if (users[username] !== password) {
        setError('Incorrect password.')
      } else {
        onLogin(username)
      }
    }
  }

  function handleAdminMode() {
    setAdminMode(true)
    setShowRegister(false)
    setUsername('admin')
    setPassword('')
    setError('')
  }

  function handleUserMode() {
    setAdminMode(false)
    setShowRegister(false)
    setUsername('')
    setPassword('')
    setError('')
  }

  function handleRegister(e) {
    e.preventDefault()
    if (username && password) {
      const users = getRegisteredUsers()
      if (users[username]) {
        setError('Username already registered.')
      } else {
        users[username] = password
        setRegisteredUsers(users)
        setError('')
        onLogin(username)
      }
    } else {
      setError('Please enter username and password')
    }
  }

  return (
    <div style={{ maxWidth: 350, margin: '2rem auto', background: 'var(--card-bg)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: '2rem 1.5rem', border: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
        <button
          type="button"
          style={{ background: !adminMode ? 'var(--primary)' : '#e0e7ff', color: !adminMode ? '#fff' : 'var(--primary)', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}
          onClick={handleUserMode}
        >
          User
        </button>
        <button
          type="button"
          style={{ background: adminMode ? 'var(--primary)' : '#e0e7ff', color: adminMode ? '#fff' : 'var(--primary)', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}
          onClick={handleAdminMode}
        >
          Admin
        </button>
      </div>
      {!showRegister ? (
        <form onSubmit={handleSubmit}>
          <h2 style={{ textAlign: 'center', marginBottom: 20 }}>{adminMode ? 'Admin Login' : 'Login'}</h2>
          {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={e => adminMode ? undefined : setUsername(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: 12 }}
            disabled={adminMode}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: 16 }}
          />
          <button type="submit" style={{ width: '100%', marginBottom: 10 }}>{adminMode ? 'Login as Admin' : 'Login'}</button>
          {!adminMode && (
            <div style={{ textAlign: 'center' }}>
              <button type="button" className="link-btn" onClick={() => setShowRegister(true)}>
                Don't have an account? Register
              </button>
            </div>
          )}
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Register</h2>
          {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: 12 }}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: 16 }}
          />
          <button type="submit" style={{ width: '100%', marginBottom: 10 }}>Register & Login</button>
          <div style={{ textAlign: 'center' }}>
            <button type="button" className="link-btn" onClick={() => setShowRegister(false)}>
              Already have an account? Login
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
