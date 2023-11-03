import {Route, Routes} from 'react-router-dom'

import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'
import PasswordReset from './components/PasswordReset'
import Home from './components/Home'
import NotFound from './components/NotFound'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/password" element={<PasswordReset />} />
        <Route path="/home" element={<Home />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
