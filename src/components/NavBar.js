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

  const toggleModal = () => {
    document.getElementById("modal").classList.toggle("show");
  };

  const handleModalClick = () => {
    if (document.getElementById("nav").classList.contains("show")) {
      toggleShowMenu();
    } else {
      toggleShowAuthedUserMenu();
    }

    toggleModal();
  };

  const toggleShowMenu = () => {
    document.getElementById("nav").classList.toggle("show");
  };

  const handleMenuButtonClick = () => {
    toggleShowMenu();
    toggleModal();
  };

  const handleMenuItemClick = (id) => {
    setActive(id);
    if (document.getElementById("nav").classList.contains("show")) {
      toggleShowMenu();
      toggleModal();
    }
  };

  const toggleShowAuthedUserMenu = () => {
    const style = document.querySelector(".authed-user-menu").style;
    style.display === "none"
      ? (style.display = "block")
      : (style.display = "none");
  };

  const handleAvatarClick = () => {
    toggleShowAuthedUserMenu();
    toggleModal();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.setItem("token", null);
    dispatch(resetApp());
    setActive(DEFAULT_PAGE);
    navigate("/");
  };

  return (
    <section className="navbar">
      <div id="modal" className="modal" onClick={handleModalClick}></div>

      <img class="logo-left" src={logo} alt="employee poll logo"></img>

      <button class="menu-button" onClick={handleMenuButtonClick}>
        <div class="menu-burger-icon"></div>
      </button>

      <nav id="nav">
        <div class="menu-button-container">
          <button class="menu-button" onClick={handleMenuButtonClick}>
            <div class="menu-close-icon"></div>
          </button>
        </div>

        <Link
          id="dashboard"
          to="/"
          className={active === "dashboard" ? "active" : ""}
          onClick={() => handleMenuItemClick("dashboard")}
        >
          Dashborad
        </Link>
        <Link
          id="leaderboard"
          to="/leaderboard"
          className={active === "leaderboard" ? "active" : ""}
          onClick={() => handleMenuItemClick("leaderboard")}
        >
          Leaderboard
        </Link>
        <Link
          id="newpoll"
          to="/newpoll"
          className={active === "newpoll" ? "active" : ""}
          onClick={() => handleMenuItemClick("newpoll")}
        >
          New Poll
        </Link>
      </nav>

      <img class="logo-center" src={logo} alt="employee poll logo"></img>

      <div className="container-right">
        <img
          className="avatar"
          src={avatarURL}
          alt="avatar"
          onClick={handleAvatarClick}
        ></img>
      </div>

      <div className="authed-user-menu" style={{ display: "none" }}>
        <ul>
          <li>{authedUser}</li>
          <li>
            <a href="" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  avatarURL: users[authedUser]?.avatarURL,
});

export default connect(mapStateToProps)(NavBar);
