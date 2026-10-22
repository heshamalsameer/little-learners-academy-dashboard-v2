import {  createSlice } from "@reduxjs/toolkit";


import getAllStudentSupports from "./act/getAllStudentSupports";
import addStudentSupport from "./act/addStudentSupport";
import deleteStudentSupport from "./act/deleteStudentSupport";
import updateStudentSupport from "./act/updateStudentSupport";

export interface IStudentSupport {
  _id?: string;
  name: string;
  image?: {url:string,public_id:string};
  description: string;
}

type TState = {
  records: IStudentSupport[];
  isLoading: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;
};

const initialState: TState = {
  records: [],
  isLoading: "Idle",
  error: null,
};




const StudentSupportSlice = createSlice({
  name: "student-support",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getAllStudentSupports.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getAllStudentSupports.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = action.payload;
    });
    builder.addCase(getAllStudentSupports.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(addStudentSupport.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(addStudentSupport.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records.push(action.payload);
    });
    builder.addCase(addStudentSupport.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(updateStudentSupport.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateStudentSupport.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = state.records.map((record) =>
        record._id === action.payload._id ? action.payload : record
      );
    });
    builder.addCase(updateStudentSupport.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(deleteStudentSupport.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteStudentSupport.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records=state.records.filter((item)=>item._id!==action.payload);
    });
    builder.addCase(deleteStudentSupport.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
  }
});

export default StudentSupportSlice.reducer;

export { getAllStudentSupports,addStudentSupport,updateStudentSupport,deleteStudentSupport };
