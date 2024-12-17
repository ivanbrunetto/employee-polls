import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    let userToken = null;
    try {
      userToken = JSON.parse(tokenString);
    } catch (error) {
      console.error(error);
      userToken = null;
      localStorage.removeItem("token");
    }

    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
