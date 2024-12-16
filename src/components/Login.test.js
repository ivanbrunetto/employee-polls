import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { render, screen, fireEvent } from "@testing-library/react";
import * as api from "../utils/api";
import Login from "./Login";

function renderLogin(mockSetToken) {
  return render(
    <React.StrictMode>
      <Provider store={store}>
        <Login setToken={mockSetToken} />
      </Provider>
    </React.StrictMode>
  );
}

const inputText = (testId, text) => {
  fireEvent.change(screen.getByTestId(testId), {
    target: { value: text },
  });
};

jest.mock("../utils/api");

describe("Login", () => {
  it("matches Login snapshot", () => {
    const { container } = renderLogin();
    expect(container).toMatchSnapshot();
  });

  it("shows login failed message", async () => {
    renderLogin(jest.fn());
    expect(screen.queryByTestId("login-failed-msg")).toBeNull();

    inputText("username-input", "abc");
    inputText("password-input", "def");

    api.login.mockRejectedValue("mockError");
    fireEvent.click(screen.getByTestId("login-btn"));
    await screen.findByTestId("login-failed-msg");
  });

  it("saves token when succeefully login", () => {
    const mockSetToken = jest.fn();

    renderLogin(mockSetToken);

    inputText("username-input", "abc");
    inputText("password-input", "def");

    api.login.mockResolvedValue({ token: "token" });
    fireEvent.click(screen.getByTestId("login-btn"));

    setTimeout(() => {
      expect(mockSetToken.mock.calls).toHaveLength(1);
      expect(mockSetToken.mock.calls[0][0]).toBe("token");

      expect(store.getState().authedUser).toBe("abc");
    }, 500);
  });
});
