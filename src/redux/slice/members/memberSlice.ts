import {  createSlice } from "@reduxjs/toolkit";


import getAllMembers from "./act/getAllMembers";
import addMember from "./act/addMember";
import updateMember from "./act/updateMember";
import deleteMember from "./act/deleteMember";

export interface IMember {
  _id?: string;
  name: string;
  photo?: {url:string,public_id:string};
  description: string;
  qualification?: string;
  email:string
}

type TState = {
  records: IMember[];
  isLoading: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;
};

const initialState: TState = {
  records: [],
  isLoading: "Idle",
  error: null,
};




const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMembers.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getAllMembers.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = action.payload;
    });
    builder.addCase(getAllMembers.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(addMember.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(addMember.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records.push(action.payload);
    });
    builder.addCase(addMember.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(updateMember.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateMember.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = state.records.map((record) =>
        record._id === action.payload._id ? action.payload : record
      );
    });
    builder.addCase(updateMember.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(deleteMember.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteMember.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records=state.records.filter((item)=>item._id!==action.payload);
    });
    builder.addCase(deleteMember.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
  }
});

export default memberSlice.reducer;

export { getAllMembers,addMember,updateMember,deleteMember };
