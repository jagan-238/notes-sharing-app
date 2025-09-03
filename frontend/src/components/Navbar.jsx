import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: "1rem 2rem",
    color: "white",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    marginRight: "1rem",
    fontWeight: "bold",
  };

  const buttonStyle = {
    backgroundColor: "#ff4d4d",
    border: "none",
    padding: "0.4rem 0.8rem",
    borderRadius: "4px",
    cursor: "pointer",
    color: "white",
  };

  const containerStyle = { display: "flex", alignItems: "center" };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={linkStyle}>Dashboard</Link>
        {user && user.role === "admin" && <Link to="/admin" style={linkStyle}>Admin Panel</Link>}
      </div>

      <div style={containerStyle}>
        {user ? (
          <>
            <Link to="/profile" style={linkStyle}>Profile</Link>
            <button
              style={buttonStyle}
              onMouseOver={e => e.target.style.backgroundColor = "#e60000"}
              onMouseOut={e => e.target.style.backgroundColor = "#ff4d4d"}
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/signup" style={linkStyle}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
