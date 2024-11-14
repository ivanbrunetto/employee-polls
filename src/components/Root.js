import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import Login from "./Login";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";

const Root = ({ dispatch, authedUser }) => {
  useEffect(() => {
    const credentials = JSON.parse(sessionStorage.getItem("token"));
    credentials?.userName && dispatch(setAuthedUser(credentials.userName));
  }, []);

  if (!authedUser) {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div id="content">
        <Outlet>
          <Dashboard />
        </Outlet>
      </div>
    </>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(Root);
