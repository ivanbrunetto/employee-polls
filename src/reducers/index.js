import { combineReducers } from "redux";
import { authedUser } from "./authedUser";
import { loadingBarReducer } from "react-redux-loading-bar";
import { users } from "./users";
import { RESET_APP } from "../actions/shared";

const combineReducer = combineReducers({
  authedUser,
  loadingBar: loadingBarReducer,
  users,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_APP) {
    state = {};
  }

  return combineReducer(state, action);
};

export default rootReducer;
