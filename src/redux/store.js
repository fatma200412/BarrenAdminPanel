import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
