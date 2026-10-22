import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteStudentSupport = createAsyncThunk(
    "StudentSupport/delete",
    async (id:string, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        await axios.delete(
          `/api/student-support/${id}`,
        );
  
        return id;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );
  export default deleteStudentSupport