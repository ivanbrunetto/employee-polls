import { useState } from "react";
import { connect } from "react-redux";
import { login } from "../utils/api";
import { setAuthedUser } from "../actions/authedUser";
import LoadingBar from "react-redux-loading-bar";
import { showLoading, hideLoading } from "react-redux-loading-bar";

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
    <div className="login">
      <LoadingBar />
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

export default connect()(Login);
