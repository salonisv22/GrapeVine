import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { login, validateSelf } from "../services/authenticationApi";
import { users } from "../services/usersApi";
import alertMessage from "./alertMessage";

import { isRejectedWithValue } from "@reduxjs/toolkit";
// import { toast } from 'your-cool-library'

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    console.log("-----------------------------");
    console.log("We got a rejected action!");
    // toast.warn({ title: 'Async error!', message: action.error.data.message })
  }

  return next(action);
};

export const store = configureStore({
  reducer: {
    [login.reducerPath]: login.reducer,
    [validateSelf.reducerPath]: validateSelf.reducer,
    [users.reducerPath]: users.reducer,
    alertMessage: alertMessage,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(rtkQueryErrorLogger)
      .concat(login.middleware)
      .concat(validateSelf.middleware)
      .concat(users.middleware),
});

setupListeners(store.dispatch);
