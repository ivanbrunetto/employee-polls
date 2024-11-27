import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../images/applogo_croped_374x374.jpeg";
import { resetApp } from "../actions/shared";
import "./NavBar.css";

const NavBar = ({ dispatch, authedUser, avatarURL }) => {
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
    if (document.getElementById("nav").classList.contains("show")) {
      toggleShowMenu();
      toggleModal();
    }
  };

  const toggleShowAuthedUserMenu = () => {
    document.querySelector(".authed-user-menu").classList.toggle("show");
  };

  const handleAvatarClick = () => {
    toggleShowAuthedUserMenu();
    toggleModal();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.setItem("token", null);
    dispatch(resetApp());
    navigate("/");
  };

  return (
    <section className="navbar">
      <div id="modal" className="modal" onClick={handleModalClick}></div>

      <img className="logo-left" src={logo} alt="employee poll logo"></img>

      <button className="menu-button" onClick={handleMenuButtonClick}>
        <div className="menu-burger-icon"></div>
      </button>

      <nav id="nav">
        <div className="menu-button-container">
          <button className="menu-button" onClick={handleMenuButtonClick}>
            <div className="menu-close-icon"></div>
          </button>
        </div>

        <NavLink
          id="dashboard"
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => handleMenuItemClick("dashboard")}
        >
          Dashborad
        </NavLink>
        <NavLink
          id="leaderboard"
          to="/leaderboard"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => handleMenuItemClick("leaderboard")}
        >
          Leaderboard
        </NavLink>
        <NavLink
          id="newpoll"
          to="/newpoll"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => handleMenuItemClick("newpoll")}
        >
          New Poll
        </NavLink>
      </nav>

      <img className="logo-center" src={logo} alt="employee poll logo"></img>

      <div className="container-right">
        <img
          className="avatar"
          src={avatarURL}
          alt="avatar"
          onClick={handleAvatarClick}
        ></img>
      </div>

      <div className="authed-user-menu">
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
