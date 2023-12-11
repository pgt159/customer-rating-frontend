import Cookies from "js-cookie";
const jwtKey = "jwt";

const objCookies = {
  expires: 90,
  domain: process.env.COOKIE_DOMAIN,
};

export const saveToken = ({ jwt }: { jwt: string }) => {
  if (jwtKey) {
    Cookies.set(jwtKey, jwt, { ...objCookies });
  } else {
    Cookies.remove(jwtKey, {
      ...objCookies,
      path: "/",
      domain: process.env.COOKIE_DOMAIN,
    });
  }
};

export const getToken = () => {
  const jwt = Cookies.get(jwtKey);
  return jwt;
};

export const removeToken = () => {
  Cookies.remove(jwtKey);
};
