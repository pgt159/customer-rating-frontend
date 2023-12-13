import React, { Fragment, useEffect, useState } from "react";
import Header from "../header/Header";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { getToken } from "@/utility/auth";
import { getMe } from "@/store/auth/authSlice";
import { RootState, useAppSelector } from "@/store/configureStore";
import ApiMethod from "@/utility/ApiMethod";
interface ILayoutMainProps {
  children?: React.ReactNode;
}

function LayoutMain({ children }: ILayoutMainProps) {
  const { isAuth } = useAppSelector((state: { auth: any }) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const hasToken = localStorage.getItem("authentication") || getToken();
    if (!isAuth && hasToken) {
      dispatch(getMe(hasToken.split(" ")[1]));
      ApiMethod.defaults.headers.common["Authorization"] = `${hasToken}`;
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
