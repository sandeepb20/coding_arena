import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '../../firebase/firebase-config';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
      alert(`Welcome, ${user.displayName}`);
      navigate("/welcome"); // Redirect to Welcome page after successful login
    }
    catch (error) {
      console.error("Error during login:", error.message);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="Login-container">
      <h1 className="Login-heading">Login to Coding Arena 101</h1>
      <button onClick={handleGoogleLogin} className="Login-button">
        Login with Gmail
      </button>
    </div>
  );
};

export default Login;
