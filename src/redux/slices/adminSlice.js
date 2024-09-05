import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: localStorage.getItem("token") !== null,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.userInfo = action.payload;
      // localStorage.setItem("token", true);
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLogin = false;
      state.userInfo = {};
      localStorage.removeItem("userInfo");
      localStorage.removeItem("isLoginAdmin");
      localStorage.removeItem("userRole");
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
