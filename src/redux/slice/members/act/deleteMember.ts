import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteMember = createAsyncThunk(
    "members/delete",
    async (id:string, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        await axios.delete(
          `/api/team-members/${id}`,
        );
  
        return id;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default deleteMember