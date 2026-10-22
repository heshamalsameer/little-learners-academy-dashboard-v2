import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addAdmissionProcess = createAsyncThunk(
  "admissionProcess/add",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post("/api/admission-process", data);
      return res.data.data; 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export default addAdmissionProcess;
