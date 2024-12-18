import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Routing from "./Routing";

jest.mock("./Dashboard", () => () => (
  <mock-dashboard data-testid={"Dashboard"} />
));
jest.mock("./Leaderboard", () => () => (
  <mock-leaderboard data-testid={"Leaderboard"} />
));
jest.mock("./NewPoll", () => () => <mock-newpoll data-testid={"NewPoll"} />);
jest.mock("./Poll", () => () => <mock-poll data-testid={"Poll"} />);
jest.mock("./Error", () => () => <mock-error data-testid={"Error"} />);

function testRoute(route, id) {
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routing />
    </MemoryRouter>
  );
  expect(screen.getByTestId(id)).toBeTruthy();
}
describe("Routing", () => {
  it("render the / page component", () => {
    testRoute("/", "Dashboard");
  });

  it("render the /dashboard page", () => {
    testRoute("/dashboard", "Dashboard");
  });

  it("should render the /leaderboard", () => {
    testRoute("/leaderboard", "Leaderboard");
  });

  it("should render the /add page", () => {
    testRoute("/add", "NewPoll");
  });

  it("should render the /questions/:id", () => {
    testRoute("/questions/:id", "Poll");
  });

  it("should render the error page", () => {
    testRoute("/*", "Error");
  });
});
