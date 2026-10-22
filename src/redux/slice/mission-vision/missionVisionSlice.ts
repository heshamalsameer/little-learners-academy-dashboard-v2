import {  createSlice } from "@reduxjs/toolkit";


import getAllMissionVision from "./act/getAllMissionVision";
import addMissionVision from "./act/addMissionVision";
import updateMssionVision from "./act/updateMssionVision";
import deleteMissionVision from "./act/deleteMissionVision";

export interface TMissionVision {
  _id?: string;
  title: string;
  description: string;
}

type TState = {
  records: TMissionVision[];
  isLoading: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;
};

const initialState: TState = {
  records: [],
  isLoading: "Idle",
  error: null,
};




const missionVisionSlice = createSlice({
  name: "missionVision",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMissionVision.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getAllMissionVision.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records =action.payload;
    });
    builder.addCase(getAllMissionVision.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(addMissionVision.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(addMissionVision.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records.push(action.payload);
    });
    builder.addCase(addMissionVision.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(updateMssionVision.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateMssionVision.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = state.records.map((record) =>
        record._id === action.payload._id ? action.payload : record
      );
    });
    builder.addCase(updateMssionVision.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(deleteMissionVision.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteMissionVision.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records=state.records.filter((item)=>item.title!==action.payload);
    });
    builder.addCase(deleteMissionVision.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
  }
});

export default missionVisionSlice.reducer;

export { getAllMissionVision,addMissionVision,updateMssionVision,deleteMissionVision };
