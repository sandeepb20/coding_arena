import React from 'react';
import './LandingPage.css';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const LandingPage = () => {
  return (
    <div className="LandingPage-container">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="LandingPage-hero">
        <h1>Welcome to Coding Arena 101</h1>
        <p>
          Your ultimate hub for coding blogs, contests, problem solving, and an
          integrated code editor.
        </p>
        <button className="LandingPage-cta-button">Get Started</button>
      </section>

      {/* Code Blogs Section */}
      <section id="blogs" className="LandingPage-section">
        <h2>Code Blogs</h2>
        <p>
          Stay updated with the latest coding trends, tutorials, and guides
          written by experts.
        </p>
        <button className="LandingPage-learn-more">Explore Blogs</button>
      </section>

      {/* Contests Section */}
      <section id="contests" className="LandingPage-section">
        <h2>Contests</h2>
        <p>
          Participate in exciting coding contests and improve your competitive
          programming skills.
        </p>
        <button className="LandingPage-learn-more">View Contests</button>
      </section>

      {/* Problem Solving Section */}
      <section id="problem-solving" className="LandingPage-section">
        <h2>Problem Solving</h2>
        <p>
          Solve coding problems and enhance your algorithmic thinking with our
          vast problem library.
        </p>
        <button className="LandingPage-learn-more">Start Solving</button>
      </section>

      {/* Code Editor Section */}
      <section id="code-editor" className="LandingPage-section">
        <h2>Code Editor</h2>
        <p>
          Write, debug, and test your code in our integrated online code editor.
        </p>
        <button className="LandingPage-learn-more">Open Code Editor</button>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
