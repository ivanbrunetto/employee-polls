import { useState } from "react";
import "./LoginForm.css";

const LoginForm = ({ onSubmit }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <p>Username</p>
      <input
        className="input"
        data-testid="username-input"
        id="username"
        type="text"
        placeholder="Username"
        onChange={(e) => setUserName(e.target.value)}
      />

      <p>Password</p>
      <input
        className="input"
        data-testid="password-input"
        id="password"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div>
        <button
          className="button"
          type="submit"
          disabled={username === "" || password === ""}
          data-testid="login-btn"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
