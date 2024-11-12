import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/applogo_croped_374x374.jpeg";

const NavBar = () => {
  const [active, setActive] = useState("dashboard");

  return (
    <div id="navbar">
      <img src={logo}></img>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashborad</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          <li>
            <Link to="/newpoll">New Poll</Link>
          </li>
        </ul>
      </nav>
      <div>
        <img src=""></img>
        <p>sarahedo</p>
        <p>Logout</p>
      </div>
    </div>
  );
};

export default NavBar;
