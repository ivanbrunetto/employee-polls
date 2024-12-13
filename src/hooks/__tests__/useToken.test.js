import useToken from "../useToken";
import { fireEvent, render, screen } from "@testing-library/react";

let mockStorage = {};

beforeEach(() => {
  Storage.prototype.setItem = jest.fn((key, value) => {
    mockStorage[key] = value;
  });

  Storage.prototype.getItem = jest.fn((key) =>
    mockStorage[key] ? mockStorage[key] : null
  );
});

afterEach(() => {
  jest.restoreAllMocks();
  mockStorage = {};
});

const TestComponent = (props) => {
  const { token, setToken } = useToken();

  console.log(token);

  const handleClick = (e) => {
    const inputToken = document.getElementsByTagName("input")[0].value;
    setToken(inputToken);
  };

  return (
    <mock-component>
      <input type="text" data-testid="input-token" />
      <button data-testid="fire-set-token" onClick={handleClick}></button>
      <p data-testid="p-token">{token?.token}</p>
    </mock-component>
  );
};

describe("useToken", () => {
  it("saves the token in storage", () => {
    render(<TestComponent />);
    expect(mockStorage).toEqual({});

    const testToken = { token: "test" };
    const inputToken = screen.getByTestId("input-token");

    fireEvent.change(inputToken, { target: { value: testToken.token } });
    fireEvent.click(screen.getByTestId("fire-set-token"));
    expect(JSON.parse(mockStorage.token)).toBe(testToken.token);
  });

  it("gets the saved token from storage", () => {
    const testToken = { token: "test" };
    mockStorage.token = JSON.stringify(testToken);

    render(<TestComponent />);

    expect(screen.getByTestId("p-token").innerHTML).toBe(testToken.token);
    expect(JSON.parse(mockStorage.token)).toEqual(testToken);
  });
});
