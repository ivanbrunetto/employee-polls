import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/applogo_croped_374x374.jpeg";

const NavBar = () => {
  const [active, setActive] = useState("dashboard");

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
      <div id="nav-left">
        <img src=""></img>
        <p>sarahedo</p>
        <p>Logout</p>
      </div>
    </div>
  );
};

export default NavBar;
