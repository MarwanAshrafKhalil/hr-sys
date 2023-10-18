import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import employeeReducer from "./employee/employeeSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistCofnig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({ employee: employeeReducer });
const persistedReducer = persistReducer(persistCofnig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
