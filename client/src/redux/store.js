import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import userReducer from "./slices/userSlice";
import ngoReducer from "./slices/ngoSlice";

// Redux Persist configuration
const persistConfig = {
  key: "root", // Key for localStorage
  storage, // Storage type (localStorage)
};

const persistedReducer = persistReducer(persistConfig, userReducer);

// Create store with middleware ignoring persist actions
export const store = configureStore({
  reducer: {
    user: persistedReducer,
    ngo: ngoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from redux-persist
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});

// Persistor instance
export const persistor = persistStore(store);
