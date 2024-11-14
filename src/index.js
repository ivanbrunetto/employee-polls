import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import "./index.css";
import Root from "./components/Root";
import ErrorPage from "./components/ErrorPage";
import Dashboard from "./components/Dashboard";
import Leaderboard from "./components/Leaderboard";
import NewPoll from "./components/NewPoll";
import reducer from "./reducers";
import middleware from "./middleware";

const store = createStore(reducer, middleware);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/newpoll",
        element: <NewPoll />,
      },
    ],
  },
]);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
