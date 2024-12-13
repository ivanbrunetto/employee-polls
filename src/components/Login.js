import { useState } from "react";
import { connect } from "react-redux";
import { login } from "../utils/api";
import { setAuthedUser } from "../actions/authedUser";
import LoadingBar from "react-redux-loading-bar";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import logo from "../images/applogo_croped_374x374.jpeg";
import "./Login.css";

const Login = (props) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const { dispatch, setToken } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoginFailed(false);

    dispatch(showLoading());
    login({ username, password })
      .then((token) => {
        dispatch(setAuthedUser(username));
        setToken(token);
        dispatch(hideLoading());
      })
      .catch((er) => {
        setLoginFailed(true);
        console.log(er);
        dispatch(hideLoading());
      });
  };

  return (
    <>
      <LoadingBar style={{ backgroundColor: "blue" }} />
      <div className="login">
        <h1 className="header">Employee Polls</h1>
        <img className="main-logo" src={logo} />
        <form onSubmit={handleSubmit}>
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
          {loginFailed && (
            <p data-testid="login-failed-msg">
              Invalid username / password. Please try again
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default connect()(Login);
