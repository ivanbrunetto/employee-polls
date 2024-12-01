import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading-bar";
import Login from "./Login";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import RouteError from "./RouteError";
import Leaderboard from "./Leaderboard";
import NewPoll from "./NewPoll";
import Poll from "./Poll";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <>
        <header>
          <LoadingBar style={{ backgroundColor: "blue" }} />
          <NavBar />
        </header>

        <main>
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/leaderboard" exact element={<Leaderboard />} />
            <Route path="/newpoll" exact element={<NewPoll />} />
            <Route path="/poll/:id" element={<Poll />} />
          </Routes>
        </main>
      </>
    ),
    errorElement: <RouteError />,
  },
]);

const App = ({ dispatch, authedUser }) => {
  useEffect(() => {
    const credentials = JSON.parse(sessionStorage.getItem("token"));

    if (credentials?.userName) {
      dispatch(setAuthedUser(credentials.userName));
      dispatch(handleInitialData());
    }
  });

  if (!authedUser) {
    return <Login />;
  }

  return <RouterProvider router={router} />;
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(App);
