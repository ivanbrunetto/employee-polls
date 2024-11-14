import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../images/applogo_croped_374x374.jpeg";
import { setAuthedUser } from "../actions/authedUser";

const NavBar = ({ dispatch, authedUser }) => {
  const [active, setActive] = useState("dashboard");

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.setItem("token", null);
    dispatch(setAuthedUser(null));
  };

  return (
    <div id="navbar">
      <img src={logo}></img>
      <nav>
        <Link
          to="/dashboard"
          className={active === "dashboard" ? "active" : ""}
          onClick={() => setActive("dashboard")}
        >
          Dashborad
        </Link>
        <Link
          to="/leaderboard"
          className={active === "leaderboard" ? "active" : ""}
          onClick={() => setActive("leaderboard")}
        >
          Leaderboard
        </Link>
        <Link
          to="/newpoll"
          className={active === "newpoll" ? "active" : ""}
          onClick={() => setActive("newpoll")}
        >
          New Poll
        </Link>
      </nav>
      <div id="container-right">
        <img src=""></img>
        <p>{authedUser}</p>
        <a href="" onClick={handleLogout}>
          Logout
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(NavBar);
