import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null, // e.g., user's data
    isLoggedIn: false,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
  },
});

export const { setUserInfo, clearUserInfo, updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
