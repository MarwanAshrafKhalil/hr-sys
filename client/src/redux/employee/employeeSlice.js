import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    openLoader: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateEmployeeSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    deleteEmployeeSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    signoutEmployee: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },

    loaderError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // closeLoader: (state) => {
    //   state.loading = false;
    // },
  },
});

export const {
  openLoader,
  signInSuccess,
  loaderError,
  updateEmployeeSuccess,
  deleteEmployeeSuccess,
  signoutEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
