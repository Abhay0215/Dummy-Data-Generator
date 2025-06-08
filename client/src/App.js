import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", selected: false });

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/users");
    setUsers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/users", form);
      fetchUsers(); // reload list
      setForm({ name: "", age: "", selected: false }); // reset form
    } catch (err) {
      alert("Error adding user");
    }
  };

  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/users/${id}`);
    fetchUsers(); // Refresh user list
  } catch (err) {
    alert("Error deleting user");
  }
};

const generateDummyData = async () => {
  try{
    await axios.post('http://localhost:3000/users/fakedata');
    fetchUsers();    
  } catch ( err){
    alert("error gene data");
  }
};

const deleteAll = async () => {
  try{
    await axios.delete('http://localhost:3000/users/deleteall');
    fetchUsers();
  } catch (err){
    alert("error bro");
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Manager</h1>
      <button onClick={generateDummyData} style={{       marginBottom: '10px' }}>
       ➕ Generate Dummy User
      </button>

      <button onClick={deleteAll} style={{       marginBottom: '10px' }}>
       ➖ Delete All Users
      </button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={form.selected}
            onChange={(e) =>
              setForm({ ...form, selected: e.target.checked })
            }
          />
          Selected
        </label>
        <button type="submit">Add User</button>
      </form>

      <h2>Users</h2>
      <ul>
        {users.map((u) => (
    <li key={u._id}>
      {u.name} ({u.age}) - {u.selected ? "✅ Selected" : "❌ Not Selected"}
      <button
        onClick={() => handleDelete(u._id)}
        style={{ marginLeft: '10px', color: 'red' }}
      >
        Delete
      </button>
    </li>
  ))}
      </ul>

     
    </div>
  );
}

export default App;
