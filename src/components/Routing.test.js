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
  it("should mock the Dashboard component", () => {
    testRoute("/", "Dashboard");
  });

  it("should mock the Leaderboard component", () => {
    testRoute("/leaderboard", "Leaderboard");
  });

  it("should mock the NewPoll component", () => {
    testRoute("/add", "NewPoll");
  });

  it("should mock the Poll component", () => {
    testRoute("/questions/:id", "Poll");
  });

  it("should mock the Error component", () => {
    testRoute("/*", "Error");
  });
});
