import { receiveUsers } from "./users";
import { getUsers } from "../utils/api";

export const RESET_APP = "RESET_APP";

export const handleInitialData = () => {
  return (dispatch) => {
    getUsers().then((users) => dispatch(receiveUsers(users)));
  };
};

export function resetApp() {
  return {
    type: RESET_APP,
  };
}
