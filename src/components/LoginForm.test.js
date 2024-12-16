import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";

const inputText = (testId, text) => {
  fireEvent.change(screen.getByTestId(testId), {
    target: { value: text },
  });
};

describe("LoginForm", () => {
  it("matches LoginForm snapshot", () => {
    const { container } = render(<LoginForm />);
    expect(container).toMatchSnapshot();
  });

  it("enable/disable login button", async () => {
    render(<LoginForm />);
    const loginBtn = screen.getByTestId("login-btn");
    expect(loginBtn.disabled).toBeTruthy();

    inputText("username-input", "abc");
    expect(loginBtn.disabled).toBeTruthy();

    inputText("password-input", "def");
    expect(loginBtn.disabled).toBeFalsy();
  });

  it("handle submit", () => {
    const mockSubmit = jest.fn();

    render(<LoginForm onSubmit={mockSubmit} />);
    expect(mockSubmit.mock.calls).toHaveLength(0);

    inputText("username-input", "abc");
    inputText("password-input", "def");

    fireEvent.click(screen.getByTestId("login-btn"));
    expect(mockSubmit.mock.calls).toHaveLength(1);
    expect(mockSubmit.mock.calls[0][0]).toBe("abc");
    expect(mockSubmit.mock.calls[0][1]).toBe("def");
  });
});
