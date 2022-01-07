import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

//Redux Persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { setupListeners } from "@reduxjs/toolkit/query";
import { login, validateSelf } from "../services/authenticationApi";
import { users } from "../services/usersApi";
import alertMessage from "./alertMessage";
import { Questions } from "../services/QuestionsService";

import { isRejectedWithValue } from "@reduxjs/toolkit";
/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.log("-----------------------------");
    console.log("We got a rejected action!");
  }
  return next(action);
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [],
};

const rootReducer = combineReducers({
  [validateSelf.reducerPath]: validateSelf.reducer,
  [users.reducerPath]: users.reducer,
  [Questions.reducerPath]: Questions.reducer,
  alertMessage: alertMessage,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(rtkQueryErrorLogger)
      .concat(login.middleware)
      .concat(validateSelf.middleware)
      .concat(users.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
