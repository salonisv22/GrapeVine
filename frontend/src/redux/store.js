import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { login } from "../services/login";

export const store = configureStore({
  reducer: {
    [login.reducerPath]: login.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(login.middleware),
});

setupListeners(store.dispatch);
