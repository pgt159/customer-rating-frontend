import React from "react";
import styles from "./styles.module.scss";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "@/store/auth/authSlice";

function Header({}) {
  const dispatch = useDispatch();
  const { isAuth, userName } = useSelector((state) => {
    return state?.auth;
  });

  const goLogin = () => {
    Router.push({
      pathname: "/auth",
    });
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className={styles.headerWrapper}>
      <span className={styles.logo}>
        {isAuth ? `Hello ${userName}` : "PGT Rating"}
      </span>
      <div className={styles.authWrapper}>
        {isAuth ? (
          <span className={styles.authButton} onClick={handleLogOut}>
            Log out
          </span>
        ) : (
          <span className={styles.authButton} onClick={goLogin}>
            Login
          </span>
        )}
      </div>
    </div>
  );
}

export default Header;
