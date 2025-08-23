import { createSlice } from "@reduxjs/toolkit";

// Load saved user from localStorage (if exists)
const storedUser = localStorage.getItem("userdata");

const userslice = createSlice({
  name: "user",
  initialState: {
    userdata: storedUser ? JSON.parse(storedUser) : null
  },
  reducers: {
    setuserdata: (state, action) => {
      state.userdata = action.payload;
      if (action.payload) {
        // Save to localStorage if user is logged in
        localStorage.setItem("userdata", JSON.stringify(action.payload));
      } else {
        // Remove from localStorage if user logs out
        localStorage.removeItem("userdata");
      }
    }
  }
});

export const { setuserdata } = userslice.actions;
export default userslice.reducer;
