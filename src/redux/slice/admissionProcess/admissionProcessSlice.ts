import { createSlice } from "@reduxjs/toolkit";

import getAllAdmissionProcess from "./act/getAllAdmissionProcess";
import addAdmissionProcess from "./act/addAdmissionProcess";
import updateAdmissionProcess from "./act/updateAdmissionProcess";
import deleteAdmissionProcess from "./act/deleteAdmissionProcess";

export interface TypeAdmissionProcess {
  _id: string;
  step: string;
  description: string;
}

type TState = {
  admissionProcess: TypeAdmissionProcess[];
  isLoading: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;
};

const initialState: TState = {
  admissionProcess: [],
  isLoading: "Idle",
  error: null,
};

const admissionProcessSlice = createSlice({
  name: "admissionProcess",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAdmissionProcess.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getAllAdmissionProcess.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.admissionProcess = action.payload; 
    });
    builder.addCase(getAllAdmissionProcess.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(addAdmissionProcess.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(addAdmissionProcess.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.admissionProcess.push(action.payload);
    });
    builder.addCase(addAdmissionProcess.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(updateAdmissionProcess.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateAdmissionProcess.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.admissionProcess = state.admissionProcess.map((admissionProcess) =>
        admissionProcess._id === action.payload._id
          ? { ...admissionProcess, ...action.payload } 
          : admissionProcess
      );
    });
    builder.addCase(updateAdmissionProcess.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(deleteAdmissionProcess.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteAdmissionProcess.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.admissionProcess = state.admissionProcess.filter(
        (item) => item._id !== action.payload
      );
    });
    builder.addCase(deleteAdmissionProcess.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
  },
});


export default admissionProcessSlice.reducer;

export {
  getAllAdmissionProcess,
  addAdmissionProcess,
  updateAdmissionProcess,
  deleteAdmissionProcess,
};
