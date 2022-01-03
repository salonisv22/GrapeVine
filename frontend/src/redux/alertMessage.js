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
      state.severity = action.payload.severity;
      state.isVisible = action.payload.isVisible;
      state.message = action.payload.message;
    },
    hideAlertMessage: (state, action) => {
      console.log("hideAlertMessage");
      state.isVisible = false;
    },
  },
});

export const { addAlertMessage, hideAlertMessage } = alertMessage.actions;

export default alertMessage.reducer;
