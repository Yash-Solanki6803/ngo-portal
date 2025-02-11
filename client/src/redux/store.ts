import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PersistState } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import userReducer from "./slices/userSlice";
import ngoReducer from "./slices/ngoSlice";
import { PersistConfig } from "redux-persist/es/types";

interface RootState {
  user: ReturnType<typeof userReducer>;
  ngo: ReturnType<typeof ngoReducer>;
}

// Redux Persist configuration
const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
};

const persistUserConfig: PersistConfig<ReturnType<typeof userReducer>> = {
  key: "user", // Key for localStorage
  storage, // Storage type (localStorage)
};
const persistNgoConfig: PersistConfig<ReturnType<typeof ngoReducer>> = {
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

export type AppDispatch = typeof store.dispatch;
export type { RootState };

// Persistor instance
export const persistor = persistStore(store);
