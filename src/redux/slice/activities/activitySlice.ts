import { createSlice } from "@reduxjs/toolkit";

import getAllActivities from "./act/getAllActivities";
import addActivity from "./act/addActivity";
import deleteActivity from "./act/deleteActivity";
import updateActivity from "./act/updateActivity";

export interface IActivity {
  _id?: string;
  name: string;
  image?: { url: string; public_id: string };
  description: string;
}

type TState = {
  records: IActivity[];
  isLoading: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;
};

const initialState: TState = {
  records: [],
  isLoading: "Idle",
  error: null,
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllActivities.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getAllActivities.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = action.payload;
    });
    builder.addCase(getAllActivities.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(addActivity.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(addActivity.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records.push(action.payload);
    });
    builder.addCase(addActivity.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(updateActivity.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateActivity.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = state.records.map((activity) =>
        activity._id === action.payload._id ? action.payload : activity
      );
    });
    builder.addCase(updateActivity.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(deleteActivity.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteActivity.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = state.records.filter((item) => item._id !== action.payload);
    });
    builder.addCase(deleteActivity.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
  },
});

export default activitySlice.reducer;

export { getAllActivities, addActivity, updateActivity, deleteActivity };
