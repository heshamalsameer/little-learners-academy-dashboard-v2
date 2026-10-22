import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllSubjects = createAsyncThunk(
    "subjects/all",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.get(
          "/api/subjects"
        );

  
        return res.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default getAllSubjects