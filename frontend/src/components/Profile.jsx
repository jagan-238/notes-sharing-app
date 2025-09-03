import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user, login } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (res.ok) login(data);
      else alert(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const containerStyle = {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.6rem",
    marginBottom: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.6rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h2>Profile</h2>
      <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} />
      <button style={buttonStyle} onClick={handleSave}>Save</button>
    </div>
  );
}
