import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteActivity = createAsyncThunk(
  "activities/delete",
  async (id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`/api/activities/${id}`);
      return id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Error");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export default deleteActivity;
