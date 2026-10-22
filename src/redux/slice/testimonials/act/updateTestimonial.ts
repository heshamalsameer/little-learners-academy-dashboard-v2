import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateTestimonial = createAsyncThunk(
    "testimonials/update",
    async (info:{id:string,data:any}, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.put(
          `/api/testimonials/${info.id}`,info.data
        );
        return res.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default updateTestimonial