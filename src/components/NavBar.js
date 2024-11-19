import { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/applogo_croped_374x374.jpeg";
import { resetApp } from "../actions/shared";
import "./NavBar.css";

const DEFAULT_PAGE = "dashboard";

const NavBar = ({ dispatch, authedUser, avatarURL }) => {
  const [active, setActive] = useState(DEFAULT_PAGE);

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.setItem("token", null);
    dispatch(resetApp());
    setActive(DEFAULT_PAGE);
    navigate("/");
  };

  return (
    <div className="app-navbar">
      <img src={logo} alt="employee poll logo"></img>
      <nav>
        <Link
          id="dashboard"
          to="/"
          className={active === "dashboard" ? "active" : ""}
          onClick={() => setActive("dashboard")}
        >
          Dashborad
        </Link>
        <Link
          id="leaderboard"
          to="/leaderboard"
          className={active === "leaderboard" ? "active" : ""}
          onClick={() => setActive("leaderboard")}
        >
          Leaderboard
        </Link>
        <Link
          id="newpoll"
          to="/newpoll"
          className={active === "newpoll" ? "active" : ""}
          onClick={() => setActive("newpoll")}
        >
          New Poll
        </Link>
      </nav>
      <div className="container-right">
        <div className="avatar">
          <img src={avatarURL} alt="avatar"></img>
          <p>{authedUser}</p>
        </div>
        <a href="" onClick={handleLogout}>
          Logout
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  avatarURL: users[authedUser]?.avatarURL,
});

export default connect(mapStateToProps)(NavBar);
