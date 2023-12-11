import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./rootSaga";
import logger from "redux-logger";

import { reducer } from "./reducer";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat(logger, sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);
