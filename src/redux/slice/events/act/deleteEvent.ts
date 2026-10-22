import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteEvent = createAsyncThunk(
    "events/delete",
    async (id:string, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        await axios.delete(
          `/api/events/${id}`,
        );
  
        return id;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default deleteEvent