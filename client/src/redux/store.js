import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import userReducer from "./slices/userSlice";
import ngoReducer from "./slices/ngoSlice";

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

const persistUserConfig = {
  key: "user", // Key for localStorage
  storage, // Storage type (localStorage)
};
const persistNgoConfig = {
  key: "ngo", // Key for localStorage
  storage, // Storage type (localStorage)
};

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);
const persistedNgoReducer = persistReducer(persistNgoConfig, ngoReducer);

// Create store with middleware ignoring persist actions
export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    ngo: persistedNgoReducer,
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
