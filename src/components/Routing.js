import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import NewPoll from "./NewPoll";
import Poll from "./Poll";
import Error from "./Error";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/dashboard" exact element={<Dashboard />} />
      <Route path="/leaderboard" exact element={<Leaderboard />} />
      <Route path="/add" exact element={<NewPoll />} />
      <Route path="/questions/:id" element={<Poll />} />
      <Route
        path="*"
        element={<Error error={{ statusText: "Page not found" }} />}
      />
    </Routes>
  );
};

export default Routing;
