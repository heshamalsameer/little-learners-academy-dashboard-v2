import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteAward = createAsyncThunk(
  "awards/delete",
  async (id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`/api/awards/${id}`);
      return id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Error");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export default deleteAward;
