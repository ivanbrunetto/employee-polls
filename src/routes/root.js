import useToken from "../hooks/useToken";
import Login from "./login";

const Root = () => {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <div className="App">
        <Login setToken={setToken} />
      </div>
    );
  }

  return <>Loged in!</>;
};

export default Root;
