import { createSlice } from "@reduxjs/toolkit";
const ngoSlice = createSlice({
  name: "ngo",
  initialState: null,
  reducers: {
    setNgoInfo: (state, action) => {
      state = action.payload;
    },
    clearNgoInfo: (state) => {
      state = null;
    },
    updateNgoInfo: (state, action) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { setNgoInfo, clearNgoInfo, updateNgoInfo } = ngoSlice.actions;

export default ngoSlice.reducer;
