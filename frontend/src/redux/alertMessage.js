import { createSlice } from "@reduxjs/toolkit";

export const alertMessage = createSlice({
  name: "alertMessage",
  initialState: {
    severity: undefined,
    isVisible: false,
    message: undefined,
  },
  reducers: {
    addAlertMessage: (state, action) => {
      state.isVisible = true;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
    hideAlertMessage: (state, action) => {
      state.isVisible = false;
    },
  },
});

export const { addAlertMessage, hideAlertMessage } = alertMessage.actions;

export default alertMessage.reducer;
