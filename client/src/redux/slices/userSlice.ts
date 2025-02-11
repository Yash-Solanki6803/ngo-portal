import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user"; // Assuming you have a `User` type

// Define the state type
interface UserState {
  userInfo: User | null;
  isLoggedIn: boolean;
}

// Initial state
const initialState: UserState = {
  userInfo: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (_, action: PayloadAction<User>) => ({
      userInfo: action.payload,
      isLoggedIn: true,
    }),
    clearUserInfo: () => ({
      userInfo: null,
      isLoggedIn: false,
    }),
    updateUserInfo: (state, action: PayloadAction<Partial<User>>) => {
      if (state.userInfo) {
        Object.assign(state.userInfo, action.payload);
      }
    },
  },
});

export const { setUserInfo, clearUserInfo, updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
