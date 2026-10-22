import {  createSlice } from "@reduxjs/toolkit";


import getAllEvents from "./act/getAllEvents";
import addEvent from "./act/addEvent"
import updateEvent from "./act/updateEvent";
import deleteEvent from "./act/deleteEvent";

export interface IEvent {
  _id?: string;
  name: string;
  image?: {url:string,public_id:string};
  description: string;
}

type TState = {
  records: IEvent[];
  isLoading: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;
};

const initialState: TState = {
  records: [],
  isLoading: "Idle",
  error: null,
};




const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getAllEvents.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getAllEvents.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = action.payload;
    });
    builder.addCase(getAllEvents.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(addEvent.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(addEvent.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records.push(action.payload);
    });
    builder.addCase(addEvent.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(updateEvent.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records = state.records.map((testimonial) =>
        testimonial._id === action.payload._id ? action.payload : testimonial
      );
    });
    builder.addCase(updateEvent.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(deleteEvent.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.records=state.records.filter((item)=>item._id!==action.payload);
    });
    builder.addCase(deleteEvent.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
  }
});

export default eventSlice.reducer;

export { getAllEvents,addEvent,updateEvent,deleteEvent };
