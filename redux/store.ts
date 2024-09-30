import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import popupSlice from "./features/popupSlice";
import pagesSlice from "./features/pagesSlice";

// Configuration for Redux Persist
const persistConfig = {
    key: "root",
    storage,
    version: 1,
    whitelist: ["userSlice", "popupSlice"], // Only userSlice and popupSlice will be persisted
};

// Combine all reducers
const rootReducer = combineReducers({
    popupSlice,
    pagesSlice,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

// Create the Redux Persistor (for persisting the Redux store)
export const persistor = persistStore(store);

// Define TypeScript types for easier usage throughout the application
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootStateType = RootState;
