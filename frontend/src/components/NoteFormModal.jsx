import React, { useState } from "react";

export default function NoteFormModal({ show, onClose, onSave, note }) {
  const [title, setTitle] = useState(note?.title || "");
  const [description, setDescription] = useState(note?.description || "");

  if (!show) return null;

  const overlayStyle = {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const modalStyle = {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    minWidth: "300px",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const btnStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    marginRight: "0.5rem",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description });
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>{note ? "Edit Note" : "Add Note"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea
            style={inputStyle}
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <div>
            <button style={{...btnStyle, backgroundColor: "#007bff", color:"white"}} type="submit">Save</button>
            <button style={{...btnStyle, backgroundColor: "#ccc"}} type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

