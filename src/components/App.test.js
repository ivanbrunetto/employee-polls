import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import * as shared from "../actions/shared";
import App from "./App";

jest.mock("swiper/react", () => ({
  Swiper: ({ children }) => children,
  SwiperSlide: ({ children }) => children,
}));

jest.mock("swiper/modules", () => ({
  Navigation: (props) => null,
  Pagination: (props) => null,
}));

jest.mock("react-router-dom", () => ({
  __esModule: true,
  ...jest.requireActual("react-router-dom"),
  BrowserRouter: ({ children }) => (
    <mock-browser-router>{children}</mock-browser-router>
  ),
}));

jest.mock("./Login", () => ({ setToken }) => {
  return (
    <mock-login data-testid={"Login"}>
      <button
        data-testid={"login-btn"}
        onClick={() => setToken({ username: "test-user" })}
      ></button>
    </mock-login>
  );
});

jest.mock("./NavBar", () => () => <mock-navbard data-testid={"NavBar"} />);
jest.mock("./Routing", () => () => <mock-routing data-testid={"Routing"} />);

function renderApp() {
  return render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

afterEach(() => {
  jest.restoreAllMocks();
});

describe("App", () => {
  it("renders the login page when the app is loaded", () => {
    renderApp();
    expect(screen.getByTestId("Login")).toBeTruthy();
  });

  it("renders the app when the token is set", async () => {
    renderApp();
    expect(screen.getByTestId("Login")).toBeTruthy();
    fireEvent.click(screen.getByTestId("login-btn"));
    await screen.findByTestId("NavBar");
    await screen.findByTestId("Routing");
  });

  it("initializes storage when token is set", () => {
    const spy = jest.spyOn(shared, "handleInitialData");
    React.useState = jest.fn().mockReturnValue([{ username: "test-user" }, {}]);
    renderApp();
    const state = store.getState();
    expect(state.authedUser).toBe("test-user");
    expect(spy).toHaveBeenCalled();
  });
});
