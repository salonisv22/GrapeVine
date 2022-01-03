import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { login } from "../services/loginService";
import { users } from "../services/usersService";
import alertMessage from "./alertMessage";

export const store = configureStore({
  reducer: {
    [login.reducerPath]: login.reducer,
    [users.reducerPath]: users.reducer,
    alertMessage: alertMessage,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(login.middleware),
});

setupListeners(store.dispatch);
