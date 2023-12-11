import { takeLatest } from "redux-saga/effects";
import { getMe, logOut, login, signup } from "./authSlice";
import {
  authLoginHandler,
  authLogoutHandler,
  authSignUpHandler,
  authFetchMe,
} from "./authHandeller";

export default function* authSaga() {
  yield takeLatest(login.type, authLoginHandler);
  yield takeLatest(signup.type, authSignUpHandler);
  yield takeLatest(getMe.type, authFetchMe);
  yield takeLatest(logOut.type, authLogoutHandler);
}
