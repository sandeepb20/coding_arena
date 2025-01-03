import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MarkdownViewer from './Components/MarkdownViewer/MarkdownViewer';
import CodeEditor from './Components/CodeEditor/CodeEditor';
import LandingPage from './Components/LandingPage/LandingPage';
import Login from './Components/Login/Login';
import Welcome from './Components/Welcome/Welcome';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="App-loading">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Redirect authenticated users to Welcome */}
        <Route path="/welcome" element={user ? <Welcome user={user} /> : <Navigate to="/login" replace />} />

        {/* Protected Routes */}
        <Route
          path="/code-editor"
          element={user ? <CodeEditor /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/blogs"
          element={user ? <MarkdownViewer /> : <Navigate to="/login" replace />}
        />

        {/* Redirect logged-in users from login page to Welcome */}
        <Route path="*" element={<Navigate to={user ? "/welcome" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
