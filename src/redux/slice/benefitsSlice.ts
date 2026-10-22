import { createSlice } from "@reduxjs/toolkit";
import { fetchBenefits, createBenefit, editBenefit, removeBenefit } from "../benefit/benefit";

interface Benefit {
  _id: string;
  title: string;
  description: string;
  icon?: string;
}

interface BenefitsState {
  benefits: Benefit[];
  loading: boolean;
  error: string | null;
}

const initialState: BenefitsState = {
  benefits: [], 
  loading: false,
  error: null,
};

const benefitsSlice = createSlice({
  name: "benefits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBenefits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBenefits.fulfilled, (state, action) => {
        state.loading = false;
        state.benefits = Array.isArray(action.payload) ? action.payload : []; 
      })
      
      .addCase(fetchBenefits.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch benefits.";
      })
      .addCase(createBenefit.fulfilled, (state, action) => {
        if (action.payload) {
          state.benefits.push(action.payload); 
        }
      })
      .addCase(editBenefit.fulfilled, (state, action) => {
        state.benefits = state.benefits.map((benefit) =>
          benefit._id === action.payload._id ? action.payload : benefit
        );
      })
      
      .addCase(removeBenefit.fulfilled, (state, action) => {
        state.benefits = state.benefits.filter((benefit) => benefit._id !== action.payload);
      });
  },
});

export default benefitsSlice.reducer;
