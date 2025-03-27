import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const headerStyle = {
    width: "100%",
    height: "64px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    padding: "0 32px",
    justifyContent: "space-between",
  };

  const logoStyle = {
    color: "#6a1b9a",
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginRight: "auto",
  };

  const navMenuStyle = {
    display: "flex",
    gap: "24px",
  };

  const navItemStyle = {
    color: "black",
    fontSize: "0.875rem",
    fontWeight: "500",
    textDecoration: "none",
    cursor: "pointer",
  };

  const loginBtnStyle = {
    marginLeft: "32px",
    color: "white",
    fontSize: "0.875rem",
    fontWeight: "600",
    backgroundColor: "#6a1b9a",
    padding: "10px 20px",
    borderRadius: "999px",
    textDecoration: "none",
    transition: "background-color 0.3s ease-in-out",
  };

  return (
    <div style={headerStyle}>
      <div style={logoStyle}>geturticket</div>
      <div style={navMenuStyle}>
        <div style={navItemStyle}>Home</div>
        <div style={navItemStyle}>Events</div>
        <div style={navItemStyle}>About</div>
        <div style={navItemStyle}>Contact</div>
      </div>
      <Link to="/login" style={loginBtnStyle} onMouseOver={(e) => (e.target.style.backgroundColor = "#d81b60")} onMouseOut={(e) => (e.target.style.backgroundColor = "#ec407a")}>
        Log In
      </Link>
    </div>
  );
};

export default Header;
