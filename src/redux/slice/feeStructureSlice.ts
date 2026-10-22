import { API_BASE } from "../../services/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${API_BASE}/api/fee-structure`;

export const fetchFeeStructures = createAsyncThunk(
  "feeStructures/fetchFeeStructures",
  async () => {
    const response = await axios.get(API_URL);
    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Invalid response format");
    }
    return response.data.data; 
  }
);

        export const fetchFeeStructureById = createAsyncThunk(
        "feeStructures/fetchFeeStructureById",
        async (id: string) => {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data?.data ?? response.data;
        }
        );

        export const createFeeStructure = createAsyncThunk(
        "feeStructures/createFeeStructure",
        async (formData: { program: string; ageGroup: string; annualTuition: string; registrationFee: string; activityFee: string }) => {
            const response = await axios.post(API_URL, formData);
            return response.data?.data ?? response.data;
        }
        );

    export const editFeeStructure = createAsyncThunk(
    "feeStructures/editFeeStructure",
    async ({ id, formData }: { id: string; formData: { program: string; ageGroup: string; annualTuition: string; registrationFee: string; activityFee: string } }) => {
        const response = await axios.put(`${API_URL}/${id}`, formData);
        return response.data?.data ?? response.data;
    }
    );

    export const removeFeeStructure = createAsyncThunk(
    "feeStructures/removeFeeStructure",
    async (id: string) => {
        await axios.delete(`${API_URL}/${id}`);
        return id;  
    }
    );

interface FeeStructure {
  _id: string;
  program: string;
  ageGroup: string;
  annualTuition: string;
  registrationFee: string;
  activityFee: string;
}

interface FeeStructureState {
  feeStructures: FeeStructure[];
  loading: boolean;
  error: string | null;
}

const initialState: FeeStructureState = {
  feeStructures: [],
  loading: false,
  error: null,
};

const feeStructureSlice = createSlice({
  name: "feeStructures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeStructures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeStructures.fulfilled, (state, action) => {
        state.loading = false;
        state.feeStructures = action.payload;
      })
      .addCase(fetchFeeStructures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch fee structures.";
      })

      .addCase(fetchFeeStructureById.fulfilled, (state, action) => {
        state.loading = false;
 
        const existingIndex = state.feeStructures.findIndex((item) => item._id === action.payload._id);
        if (existingIndex === -1) {
          state.feeStructures.push(action.payload);
        }
      })

      .addCase(createFeeStructure.fulfilled, (state, action) => {
        state.feeStructures.push(action.payload);
      })
      .addCase(editFeeStructure.fulfilled, (state, action) => {
        state.feeStructures = state.feeStructures.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(removeFeeStructure.fulfilled, (state, action) => {
        state.feeStructures = state.feeStructures.filter((item) => item._id !== action.payload);
      });
  },
});

export default feeStructureSlice.reducer;
