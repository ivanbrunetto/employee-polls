import { useState } from "react";
import { connect } from "react-redux";
import { login } from "../utils/api";
import { setAuthedUser } from "../actions/authedUser";
import LoadingBar from "react-redux-loading-bar";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import logo from "../images/applogo_croped_374x374.jpeg";
import "./Login.scss";

const Login = ({ dispatch }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoginFailed(false);

    dispatch(showLoading());
    login({ userName, password })
      .then((token) => {
        dispatch(setAuthedUser(userName));
        sessionStorage.setItem("token", JSON.stringify({ userName, token }));
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
      <LoadingBar />
      <div className="login">
        <h1 className="header">Employee Polls</h1>
        <img src={logo} />
        <form onSubmit={handleSubmit}>
          <p>Username</p>
          <input
            className="input"
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />

          <p>Password</p>
          <input
            className="input"
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>
            <button className="button" type="submit">
              Login
            </button>
          </div>
          {loginFailed && <p>Invalid username / password. Please try again</p>}
        </form>
      </div>
    </>
  );
};

export default connect()(Login);
