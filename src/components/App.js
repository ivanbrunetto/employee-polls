import { BrowserRouter } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading-bar";
import Login from "./Login";
import NavBar from "./NavBar";
import Routing from "./Routing";
import "./App.css";

const App = (props) => {
  const [token, setToken] = React.useState();
  const { dispatch } = props;

  React.useEffect(() => {
    if (token) {
      dispatch(setAuthedUser(token.username));
      dispatch(handleInitialData());
    }
  });

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <BrowserRouter>
      <header>
        <LoadingBar style={{ backgroundColor: "blue" }} />
        <NavBar setToken={setToken} />
      </header>

      <main>
        <Routing />
      </main>
    </BrowserRouter>
  );
};

export default connect()(App);
