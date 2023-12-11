// @ts-nocheck
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./rootSaga";
import logger from "redux-logger";
import { reducer } from "./reducer";
import { useSelector } from "react-redux";
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat(logger, sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

sagaMiddleware.run(rootSaga);
