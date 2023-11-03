// PasswordReset.js
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import './index.css'

const PasswordReset = () => {
  const [email, setEmail] = useState('')

  const generateUniqueToken = () => {
    const uniqueToken = uuidv4()
    return uniqueToken
  }

  const handleResetPassword = () => {
    // Implement the logic for generating a unique reset token (e.g., use a library or generate a random string)
    const resetToken = generateUniqueToken()

    // Store the reset token in localStorage with the email as the key
    localStorage.setItem(email, resetToken)

    // Notify the user
    alert(`Password reset link sent to ${email}`)
  }

  // Implement a function to generate a unique reset token

  return (
    <div className="password-reset">
      <h2>Reset Password</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button type="button" onClick={handleResetPassword}>
        Reset Password
      </button>
      <div className="homeLink">
        {' '}
        <Link to="/">Home</Link>
      </div>
    </div>
  )
}

export default PasswordReset
