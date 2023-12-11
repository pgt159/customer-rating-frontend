import { API_URL } from "@/configs/constants";
import ApiMethod from "@/utility/ApiMethod";

import axios from "axios";

export const loginService = (payload: {
  userName: string;
  password: string;
}) => {
  return ApiMethod.post(`users/login`, payload);
};

export const signUpService = (payload: {
  name: string;
  userName: string;
  password: string;
  passwordConfirm: string;
}) => {
  return ApiMethod.post("users/signup", payload);
};

export const fetchMeService = (payload: string) => {
  return ApiMethod.get(`users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload}`,
    },
  });
};
