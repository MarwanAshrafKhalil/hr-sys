import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import employeeReducer from "./employee/employeeSlice";

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
