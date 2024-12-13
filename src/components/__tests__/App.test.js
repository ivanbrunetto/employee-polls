import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import App from "../App";
import * as shared from "../../actions/shared";

function mockComponent(id) {
  return <mock-login data-testid={id} />;
}

jest.mock("swiper/react", () => ({
  Swiper: ({ children }) => children,
  SwiperSlide: ({ children }) => children,
}));

jest.mock("swiper/modules", () => ({
  Navigation: (props) => null,
  Pagination: (props) => null,
}));

jest.mock("../Login", () => () => mockComponent("Login"));
jest.mock("../NavBar", () => () => mockComponent("NavBar"));
jest.mock("../Routing", () => () => mockComponent("Routing"));

function renderApp() {
  return render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

let mockStorage = {};

beforeEach(() => {
  Storage.prototype.setItem = jest.fn((key, value) => {
    mockStorage[key] = value;
  });

  Storage.prototype.getItem = jest.fn((key) =>
    mockStorage[key] ? mockStorage[key] : null
  );

  mockStorage = {};
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("App", () => {
  it("renders the login page when token is not set", () => {
    renderApp();
    expect(screen.getByTestId("Login")).toBeTruthy();
  });

  it("renders the main page when token is set", () => {
    mockStorage = {
      token: JSON.stringify({ token: "abc", username: "test-user" }),
    };

    renderApp();
    expect(screen.getByTestId("NavBar")).toBeTruthy();
    expect(screen.getByTestId("Routing")).toBeTruthy();
  });

  it("initializes storage when token is set", () => {
    mockStorage = {
      token: JSON.stringify({ token: "abc", username: "test-user" }),
    };

    const spy = jest.spyOn(shared, "handleInitialData");
    renderApp();
    const state = store.getState();
    expect(state.authedUser).toBe("test-user");
    expect(spy).toHaveBeenCalled();
  });
});

/* describe("Login", () => {
  function performLogin(username, password) {
    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");

    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });

    fireEvent.click(screen.getByTestId("login-btn"));
  }

  it("matches login snapshot", () => {
    const { container } = renderApp();
    expect(container).toMatchSnapshot();
  });

  it("enable login button", async () => {
    renderApp();
    const loginBtn = screen.getByTestId("login-btn");
    expect(loginBtn.disabled).toBeTruthy();

    fireEvent.change(screen.getByTestId("username-input"), {
      target: { value: "a" },
    });
    expect(loginBtn.disabled).toBeTruthy();

    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "a" },
    });
    expect(loginBtn.disabled).toBeFalsy();
  });

  it("shows login failed message", async () => {
    renderApp();

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");

    fireEvent.change(usernameInput, { target: { value: "a" } });
    fireEvent.change(passwordInput, { target: { value: "a" } });

    fireEvent.click(screen.getByTestId("login-btn"));
    await screen.findByTestId("login-failed-msg");
  });

  it("does login successfully", async () => {
    renderApp();

    performLogin("sarahedo", "password123");

    const actualUsername = (await screen.findByTestId("authed-user")).innerHTML;
    expect(actualUsername).toEqual("sarahedo");
  });
});
 */
