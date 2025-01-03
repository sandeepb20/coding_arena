import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './Welcome.css';

const Welcome = ({ user }) => {
    const auth = getAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/"); // Redirect to login page after logout
        } catch (error) {
            console.error("Error during logout:", error.message);
            alert("Logout failed. Please try again.");
        }
    };

    return (
        <div className="Welcome-container">
            <h1 className="Welcome-title">Welcome to Coding Arena 101</h1>
            {user ? (
                <div className="Welcome-user">
                    <img src={user.photoURL} alt="User Avatar" className="Welcome-avatar" />
                    <h2 className="Welcome-username">{user.displayName}</h2>
                    <p className="Welcome-email">{user.email}</p>
                    <button onClick={handleLogout} className="Welcome-logout-button">
                        Logout
                    </button>
                </div>
            ) : (
                <p className="Welcome-message">Please log in to access your account.</p>
            )}
        </div>
    );
};

export default Welcome;
