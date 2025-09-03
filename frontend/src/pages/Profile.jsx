import { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user, token } = useContext(AuthContext);
  const [name, setName] = useState(user.name);
  const [message, setMessage] = useState("");

  const updateProfile = async () => {
    await api.put(`/users/${user.id}`, { name });
    setMessage("Profile updated successfully");
  };

  return (
    <div>
      <h2>Profile</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={updateProfile}>Update</button>
      <p>{message}</p>
    </div>
  );
}
