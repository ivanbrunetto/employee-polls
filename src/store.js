import reducer from "./reducers";
import middleware from "./middleware";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer,
  middleware: () => middleware,
});
