import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="Navbar-header">
      <nav className="Navbar-nav">
        <a href="/"><div className="Navbar-logo">Coding Arena 101</div></a>
        <a href="/blogs" className="Navbar-link">Blogs</a>
        <a href="#contests" className="Navbar-link">Contests</a>
        <a href="#problem-solving" className="Navbar-link">Problem Solving</a>
        <a href="/code-editor" className="Navbar-link">Code Editor</a>
      </nav>
    </header>
  );
};

export default Navbar;
