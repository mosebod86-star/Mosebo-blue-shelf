import React, { useState } from "react";

function Login({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const success = login(email, password);

    if (!success) {
      setMessage("Invalid email or password.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>📗 BlueShelf Library</h1>

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>
        </form>

        {message && (
          <p className="error-message">
            {message}
          </p>
        )}

        <p className="demo-login">
          Demo login:
          <br />
          Email: admin@blueshelf.com
          <br />
          Password: admin123
        </p>
      </div>
    </div>
  );
}

export default Login;