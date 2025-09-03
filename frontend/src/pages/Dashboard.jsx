import React, { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard.jsx";
import NoteFormModal from "../components/NoteFormModal.jsx";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/notes", {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setNotes(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchNotes(); }, []);

  const handleSave = async (noteData) => {
    try {
      const url = editingNote ? `http://localhost:5000/api/notes/${editingNote._id}` : "http://localhost:5000/api/notes";
      const method = editingNote ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify(noteData)
      });
      const data = await res.json();
      setModalOpen(false);
      setEditingNote(null);
      fetchNotes();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (note) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await fetch(`http://localhost:5000/api/notes/${note._id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
      });
      fetchNotes();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setModalOpen(true);
  };

  const handleShare = async (note) => {
    const email = prompt("Enter user email to share:");
    if (!email) return;
    try {
      await fetch(`http://localhost:5000/api/notes/share/${note._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ email })
      });
      fetchNotes();
    } catch (err) { console.error(err); }
  };

  const containerStyle = { padding: "1rem" };
  const searchStyle = { padding: "0.5rem", width: "300px", marginBottom: "1rem" };
  const gridStyle = { display: "flex", flexWrap: "wrap" };

  const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={containerStyle}>
      <h2>Dashboard</h2>
      <input
        style={searchStyle}
        placeholder="Search notes..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button style={{marginLeft:"1rem", padding:"0.5rem", cursor:"pointer"}} onClick={() => setModalOpen(true)}>Add Note</button>
      <div style={gridStyle}>
        {filteredNotes.map(note => (
          <NoteCard key={note._id} note={note} onEdit={handleEdit} onDelete={handleDelete} onShare={handleShare} />
        ))}
      </div>
      <NoteFormModal show={modalOpen} onClose={() => { setModalOpen(false); setEditingNote(null); }} onSave={handleSave} note={editingNote} />
    </div>
  );
}

