import { createSlice } from "@reduxjs/toolkit";

import getAllAwards from "./act/getAllAwards";
import addAward from "./act/addAward";
import deleteAward from "./act/deleteAward";
import updateAward from "./act/updateAward";

export interface IAward {
  _id?: string;
  name: string;
  image?: { url: string; public_id: string };
  description: string;
}

type TState = {
  records: IAward[];
  isLoading: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;
};

const initialState: TState = {
  records: [],
  isLoading: "Idle",
  error: null,
};

const awardSlice = createSlice({
  name: "award",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAwards.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getAllAwards.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = action.payload;
    });
    builder.addCase(getAllAwards.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(addAward.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(addAward.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records.push(action.payload);
    });
    builder.addCase(addAward.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(updateAward.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateAward.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = state.records.map((activity) =>
        activity._id === action.payload._id ? action.payload : activity
      );
    });
    builder.addCase(updateAward.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(deleteAward.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteAward.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = state.records.filter((item) => item._id !== action.payload);
    });
    builder.addCase(deleteAward.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
  },
});

export default awardSlice.reducer;

export { getAllAwards, addAward, updateAward, deleteAward };
