import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { login } from "../services/loginService";
import { users } from "../services/usersService";
import alertMessage from "./alertMessage";
import { Questions } from "../services/QuestionsService";

export const store = configureStore({
  reducer: {
    [login.reducerPath]: login.reducer,
    [users.reducerPath]: users.reducer,
    [Questions.reducerPath]:Questions.reducer,
    alertMessage: alertMessage,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(login.middleware),
});

setupListeners(store.dispatch);
