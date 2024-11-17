import { receiveUsers } from "./users";
import { getInitialData } from "../utils/api";
import { receiveQuestions } from "./questions";
import { hideLoading, showLoading } from "react-redux-loading-bar";

export const RESET_APP = "RESET_APP";

export const handleInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
};

export const resetApp = () => {
  return {
    type: RESET_APP,
  };
};
