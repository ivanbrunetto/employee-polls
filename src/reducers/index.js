import { combineReducers } from "redux";
import { authedUser } from "./authedUser";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
  authedUser,
  loadingBar: loadingBarReducer,
});
