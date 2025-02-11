import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NGO } from "../../types/ngo";

interface NgoState {
  ngoInfo: NGO | null;
  isAnNgo: boolean;
}

const initialState: NgoState = {
  ngoInfo: null,
  isAnNgo: false,
};

const ngoSlice = createSlice({
  name: "ngo",
  initialState,
  reducers: {
    setNgoInfo: (_, action: PayloadAction<NGO>) => ({
      ngoInfo: action.payload,
      isAnNgo: true,
    }),

    clearNgoInfo: () => ({
      ngoInfo: null,
      isAnNgo: false,
    }),

    updateNgoInfo: (state, action: PayloadAction<Partial<NGO>>) => {
      if (state.ngoInfo) {
        Object.assign(state.ngoInfo, action.payload);
      }
    },
  },
});

export const { setNgoInfo, clearNgoInfo, updateNgoInfo } = ngoSlice.actions;

export default ngoSlice.reducer;
