import { useRouteError } from "react-router-dom";
import Error from "./Error";

const RouteError = () => {
  const error = useRouteError();
  console.error(error);

  return <Error error={error} />;
};

export default RouteError;
