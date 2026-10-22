import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addAward = createAsyncThunk(
  "awards/add",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post("/api/awards", data);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Error");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export default addAward;
