import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteTestimonial = createAsyncThunk(
    "testimonials/delete",
    async (id:string, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        await axios.delete(
          `/api/testimonials/${id}`,
        );
  
        return id;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default deleteTestimonial