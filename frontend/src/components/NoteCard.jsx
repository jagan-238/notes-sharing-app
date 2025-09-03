
import React from "react";

export default function NoteCard({ note, onEdit, onDelete, onShare }) {
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "1rem",
    margin: "0.5rem",
    width: "250px",
    boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
  };

  const titleStyle = { fontWeight: "bold", marginBottom: "0.5rem" };
  const descStyle = { marginBottom: "0.5rem" };
  const btnStyle = {
    marginRight: "0.5rem",
    padding: "0.3rem 0.6rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div style={cardStyle}>
      <div style={titleStyle}>{note.title}</div>
      <div style={descStyle}>{note.description}</div>
      <div>
        {onEdit && <button style={{...btnStyle, backgroundColor: "#007bff", color:"white"}} onClick={() => onEdit(note)}>Edit</button>}
        {onDelete && <button style={{...btnStyle, backgroundColor: "#ff4d4d", color:"white"}} onClick={() => onDelete(note)}>Delete</button>}
        {onShare && <button style={{...btnStyle, backgroundColor: "#28a745", color:"white"}} onClick={() => onShare(note)}>Share</button>}
      </div>
    </div>
  );
}
