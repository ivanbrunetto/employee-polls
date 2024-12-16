import { useState } from "react";
import { connect } from "react-redux";
import { login } from "../utils/api";
import { setAuthedUser } from "../actions/authedUser";
import LoadingBar from "react-redux-loading-bar";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import LoginForm from "./LoginForm";
import logo from "../images/applogo_croped_374x374.jpeg";
import "./Login.css";

const Login = (props) => {
  const [loginFailed, setLoginFailed] = useState(false);

  const { dispatch, setToken } = props;

  const onSubmit = (username, password) => {
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
        <LoginForm onSubmit={onSubmit} />
        {loginFailed && (
          <p data-testid="login-failed-msg">
            Invalid username / password. Please try again
          </p>
        )}
      </div>
    </>
  );
};

export default connect()(Login);
