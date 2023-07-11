import React, { useState } from "react";

const SignUpForm = ({ handleSignUp }) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp(username, role, password);
    setUsername("");
    setPassword("");
    setRole("");
  };
  return (
    <div className="wrapper">

      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div style={{ width: "500px" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <select
            name="role"
            defaultValue={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
