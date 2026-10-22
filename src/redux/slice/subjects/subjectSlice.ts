import {  createSlice } from "@reduxjs/toolkit";


import getAllSubjects from "./act/getAllSubjects";
import addSubject from "./act/addSubject";
import updateSubject from "./act/updateSubject";
import deleteSubject from "./act/deleteSubject";

export interface ISubject {
  _id?: string;
  name: string;
  image?: {url:string,public_id:string};
  description: string;
}

type TState = {
  records: ISubject[];
  isLoading: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;
};

const initialState: TState = {
  records: [],
  isLoading: "Idle",
  error: null,
};




const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSubjects.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getAllSubjects.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = action.payload;
    });
    builder.addCase(getAllSubjects.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(addSubject.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(addSubject.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records.push(action.payload);
    });
    builder.addCase(addSubject.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(updateSubject.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateSubject.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = state.records.map((testimonial) =>
        testimonial._id === action.payload._id ? action.payload : testimonial
      );
    });
    builder.addCase(updateSubject.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(deleteSubject.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteSubject.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records=state.records.filter((item)=>item._id!==action.payload);
    });
    builder.addCase(deleteSubject.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
  }
});

export default subjectSlice.reducer;

export { getAllSubjects,addSubject,updateSubject,deleteSubject };
