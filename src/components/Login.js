import { useState } from "react";
import { PropTypes } from "prop-types";
import { login } from "../utils/api";

const Login = ({ setToken }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoginFailed(false);

    login({ userName, password })
      .then((token) => setToken(token))
      .catch((er) => {
        setLoginFailed(true);
        console.log(er);
      });
  };

  return (
    <div claseName="login">
      <h1>Employee Polls</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Login</button>
        </div>
        {loginFailed && <p>Invalid username / password. Please try again</p>}
      </form>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
