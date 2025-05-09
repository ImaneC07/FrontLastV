import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      {/* Logo */}
      <div className="logo">
        <span className="logo-getur">getur</span>
        <span className="logo-ticket">ticket</span>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search events, locations, etc..." />
        <FaSearch className="search-icon" />
      </div>

      {/* Navigation Menu */}
      <div className="nav-menu">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/about" className="nav-item">About Us</Link>
        <Link to="/helpcenter" className="nav-item">Help Center</Link>
      </div>

      {/* Auth Buttons */}
      <div className="auth-buttons">
        <Link to="/signup" className="auth-button sign-up-btn">Sign Up</Link>
        <Link to="/Auth/login" className="auth-button login-btn">Log In</Link>
      </div>
    </div>
  );
};

export default Header;
