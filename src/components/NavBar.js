import { useState } from "react";
import logo from "../images/applogo_croped_374x374.jpeg";

const NavBar = () => {
  const [active, setActive] = useState("dashboard");

  return (
    <div id="navbar">
      <img src={logo}></img>
      <nav>
        <ul>
          <li>
            <a>Dashborad</a>
          </li>
          <li>
            <a>Leaderboard</a>
          </li>
          <li>
            <a>New Poll</a>
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
