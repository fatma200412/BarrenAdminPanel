import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
  users: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState ,
  reducers: {
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    //     extraReducers:(){

    //     }
  },
});

// Action creators are generated for each case reducer function
export const { decrement, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;
