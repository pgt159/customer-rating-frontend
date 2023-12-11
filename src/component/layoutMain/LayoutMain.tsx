import React, { Fragment, useEffect, useState } from "react";
import Header from "../header/Header";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "@/utility/auth";
import { getMe } from "@/store/auth/authSlice";

interface ILayoutMainProps {
  children?: React.ReactNode;
}

function LayoutMain({ children }: ILayoutMainProps) {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const hasToken = localStorage.getItem("authentication") || getToken();
    if (!isAuth && hasToken) {
      dispatch(getMe(hasToken.split(" ")[1]));
    }
  }, [dispatch, isAuth]);

  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
}

export default LayoutMain;
