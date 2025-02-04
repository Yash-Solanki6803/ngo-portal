import { createSlice } from "@reduxjs/toolkit";

const ngoSlice = createSlice({
  name: "ngo",
  initialState: null,
  reducers: {
    setNgoInfo: (_, action) => action.payload, // Fixed
    clearNgoInfo: () => null, // Fixed
    updateNgoInfo: (state, action) => ({ ...state, ...action.payload }), // Fixed
  },
});

export const { setNgoInfo, clearNgoInfo, updateNgoInfo } = ngoSlice.actions;

export default ngoSlice.reducer;
