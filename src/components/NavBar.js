import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../images/applogo_croped_374x374.jpeg";
import { resetApp } from "../actions/shared";
import "./NavBar.css";

const NavBar = (props) => {
  const navigate = useNavigate();

  const { dispatch, authedUser, avatarURL, setToken } = props;

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
    setToken(null);
    dispatch(resetApp());
    navigate("/");
  };

  return (
    <section className="navbar">
      <div id="modal" className="modal" onClick={handleModalClick}></div>

      <img src={logo} alt="employee poll logo"></img>

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
          Dashboard
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
          to="/add"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => handleMenuItemClick("newpoll")}
        >
          New Poll
        </NavLink>
      </nav>

      <div className="container-right" onClick={handleAvatarClick}>
        <img className="avatar" src={avatarURL} alt="avatar"></img>
        <p>
          <span data-testid="authed-user">{authedUser}</span> &#9660;
        </p>
      </div>

      <div className="authed-user-menu">
        <ul>
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
