import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import loadingReducer from "./loading/loadingSlice";
export const reducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
});
