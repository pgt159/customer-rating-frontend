import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";

export const reducer = combineReducers({
  auth: authReducer,
});
