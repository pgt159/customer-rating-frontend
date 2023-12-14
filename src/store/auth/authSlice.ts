import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuth: boolean;
  userName?: string;
  id?: string;
  token?: string;
}

const initialState: AuthState = {
  isAuth: false,
  userName: undefined,
  id: undefined,
  token: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    login: (state, action) => {},
    signup: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    updateUser: (state, action) => ({
      ...state,
      isAuth: true,
      userName: action.payload.data.user.userName,
      id: action.payload.data.user._id,
      token: action.payload.token,
    }),
    getMe: (state) => ({
      ...state,
    }),
  },
});

export const { login, logOut, signup, updateUser, getMe } = authSlice.actions;
export default authSlice.reducer;
