// LoginForm.js
import React, { useState } from "react";

import { Link, useHistory} from "react-router-dom"; 
import "./index.css";

const LoginForm = () => {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test");

  const history = useHistory();

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === email && user.password === password) {
      alert("Login successful");
      history.replace('/home')
    } else {
      alert("Login failed");
    }
    
  };

  React.useEffect(() => {
    const fakeUser = {
      email: "test@test.com",
      password: "test",
    };
    localStorage.setItem("user", JSON.stringify(fakeUser));
  }, []);



  return (
    <div className="login-form">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    
       <div className="homeLink">    <Link to="/password">Forget Password?</Link></div>
      
      
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/registration">Sign Up Now</Link>
      </p>
      
    </div>
  );
};

export default LoginForm;