import { createSlice } from "@reduxjs/toolkit";

export const countSlice = createSlice({
  name: "countSlice",
  initialState: {
    value: 0,
  },

  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    decrementAll(state, action) {
      state.value -= action.payload;
    },
  },
});

export const { increment, decrement, decrementAll } = countSlice.actions;
export default countSlice.reducer;
