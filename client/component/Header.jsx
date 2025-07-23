import React, { useState } from 'react';
import './Header.css'; // Import the separate CSS file

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="header">
      <nav className="navbar">
        
        <div className="navbar-brand">
          <a href="/" className="navbar-logo">
            <span>BookMandu</span>
          </a>
        </div>

        <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>


        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

    
        <div className="navbar-actions">
          <button className="btn"><a href="signin">SignIn</a></button>
        </div>
      </nav>
    </header>
  );
}
