// RegistrationForm.js
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import './index.css'

const RegistrationForm = () => {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = () => {
    const username = uuidv4()
    const user = {email, password, username}
    localStorage.setItem('userq', JSON.stringify(user))
    setEmail('')
    setPhone('')
    setPassword('')
  }

  return (
    <div className="registration-form">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="button" onClick={handleRegister}>
        Register
      </button>
      <div className="homeLink">
        {' '}
        <Link to="/">Home</Link>
      </div>
    </div>
  )
}

export default RegistrationForm
