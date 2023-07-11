import React, { useState } from "react";

const AdminLoginForm = ({ handleAdminLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdminLogin(username, password);
    setUsername("");
    setPassword("");
  };
 
  return (
    <div className="wrapper">
    
      <form onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <div style={{ width: "500px" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginForm;
