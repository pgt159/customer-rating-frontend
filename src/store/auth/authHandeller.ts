// @ts-nocheck
import { call, put } from "redux-saga/effects";
import {
  fetchMeService,
  loginService,
  signUpService,
} from "../services/auth.services";
import { toast } from "react-toastify";
import { removeToken, saveToken } from "@/utility/auth";
import { updateUser } from "./authSlice";
import Router from "next/router";
import ApiMethod from "@/utility/ApiMethod";
import { toggleLoading } from "../loading/loadingSlice";
interface IApiReturn {
  status: number;
  data: any;
}
export function* authLogoutHandler() {
  removeToken();
  localStorage.clear();
  window.location.href = "/";
}

export function* authLoginHandler({
  payload,
}: {
  payload: {
    userName: string;
    password: string;
  };
}) {
  yield put(toggleLoading(true));
  try {
    const res: IApiReturn = yield call(loginService, payload);
    if (res.status === 200) {
      toast.success(`Login successfully, hello ${res.data.data.user.name}`);
      saveToken({ jwt: res.data.token });
      localStorage.setItem("authentication", `Bearer ${res.data.token}`);
      ApiMethod.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;
      yield put(updateUser({ ...res.data, isAuth: true }));
      Router.push({
        pathname: "/",
      });
    } else {
      console.log(res);
    }
  } catch (error) {
    toast.error(error.response.data.message, {
      hideProgressBar: true,
      autoClose: 500,
    });
  } finally {
    yield put(toggleLoading(false));
  }
}

export function* authSignUpHandler({
  payload,
}: {
  payload: {
    name: string;
    userName: string;
    password: string;
    passwordConfirm: string;
  };
}) {
  try {
    const res: IApiReturn = yield call(signUpService, payload);
    if (res.status === 201) {
      toast("Sign up successfully");
    }
  } catch (error) {
    console.log(error);
  }
  yield 1;
}

export function* authFetchMe({ payload }: { payload: string }) {
  try {
    const res: IApiReturn = yield call(fetchMeService, payload);
    if (res.status === 200) {
      yield put(updateUser({ ...res.data, isAuth: true }));
    } else if (res.status === 401) {
      authLogoutHandler();
    }
  } catch (error) {
    console.log(error);
  }
}
