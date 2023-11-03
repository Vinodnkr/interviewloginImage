// LoginForm.js
import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import AuthenticateUser from '../AuthService' // Import AuthenticateUser
import './index.css'

const LoginForm = () => {
  const [email, setEmail] = useState('user1@example.com')
  const [password, setPassword] = useState('password')

  const navigate = useNavigate()

  const handleLogin = () => {
    const user = AuthenticateUser(email, password)

    if (user) {
      alert('Login successful')
      navigate('/home', {state: {username: user.username}})
    } else {
      alert('Login failed')
    }
  }

  return (
    <div className="login-form">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div className="homeLink">
        {' '}
        <Link to="/password">Forget Password?</Link>
      </div>
      <button type="button" onClick={handleLogin}>
        Login
      </button>
      <p>
        Don&apos;t have an account? <Link to="/registration">Sign Up Now</Link>
      </p>
    </div>
  )
}

export default LoginForm
