import React from 'react';
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className="LandingPage-landing-page">
      <header className="LandingPage-header">
        <div className="LandingPage-logo">Coding Arena 101</div>
        <nav className="LandingPage-nav">
          <a href="#blogs">Blogs</a>
          <a href="#contests">Contests</a>
          <a href="#problem-solving">Problem Solving</a>
          <a href="#code-editor">Code Editor</a>
        </nav>
      </header>

      <section className="LandingPage-hero">
        <h1>Welcome to Coding Arena 101</h1>
        <p>Your ultimate hub for coding blogs, contests, problem solving, and an integrated code editor.</p>
        <button className="LandingPage-cta-button">Get Started</button>
      </section>

      <section id="blogs" className="LandingPage-section">
        <h2>Code Blogs</h2>
        <p>Stay updated with the latest coding trends, tutorials, and guides written by experts.</p>
        <button className="LandingPage-learn-more">Explore Blogs</button>
      </section>

      <section id="LandingPage-contests" className="LandingPage-section">
        <h2>Contests</h2>
        <p>Participate in exciting coding contests and improve your competitive programming skills.</p>
        <button className="LandingPage-learn-more">View Contests</button>
      </section>

      <section id="LandingPage-problem-solving" className="LandingPage-section">
        <h2>Problem Solving</h2>
        <p>Solve coding problems and enhance your algorithmic thinking with our vast problem library.</p>
        <button className="LandingPage-learn-more">Start Solving</button>
      </section>

      <section id="LandingPage-code-editor" className="LandingPage-section">
        <h2>Code Editor</h2>
        <p>Write, debug, and test your code in our integrated online code editor.</p>
        <button className="LandingPage-learn-more">Open Code Editor</button>
      </section>

      <footer className="LandingPage-footer">
        <p>&copy; 2024 Coding Arena 101. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
