import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import App from "../App";
import * as shared from "../../actions/shared";

jest.mock("swiper/react", () => ({
  Swiper: ({ children }) => children,
  SwiperSlide: ({ children }) => children,
}));

jest.mock("swiper/modules", () => ({
  Navigation: (props) => null,
  Pagination: (props) => null,
}));

jest.mock("../Login", () => () => <mock-login data-testid={"Login"} />);
jest.mock("../NavBar", () => () => <mock-navbard data-testid={"NavBar"} />);
jest.mock("../Routing", () => () => <mock-routing data-testid={"Routing"} />);

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
