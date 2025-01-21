import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"; // Example reducer

const store = configureStore({
  reducer: {
    user: userReducer, // Add reducers here
  },
});

export default store;
