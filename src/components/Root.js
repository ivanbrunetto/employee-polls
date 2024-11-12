import { useState } from "react";
import { Outlet } from "react-router-dom";
import useToken from "../hooks/useToken";
import Login from "./Login";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";

const Root = () => {
  const { token, setToken } = useToken();

  const [active, setActive] = useState("dashboard");

  if (!token) {
    return (
      <div className="App">
        <Login setToken={setToken} />
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

export default Root;

/* <Navbar appearance="subtle"> */
/*       
    <Nav appearance="subtle" activeKey="">
        <Nav.Item eventKey="dashboard">Dahsboard</Nav.Item>
        <Nav.Item>Leaderboard</Nav.Item>
        <Nav.Item>New Poll</Nav.Item>
      </Nav>
      <Nav pullRight>
        <Nav.Item>Logout</Nav.Item>
    </Nav>
*/
/* </Navbar> */
