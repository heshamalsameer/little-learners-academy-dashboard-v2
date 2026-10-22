import { createSlice } from "@reduxjs/toolkit";
import { fetchFAQs, createFAQ, editFAQ, removeFAQ } from "../../faq/faqAct";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

interface FAQState {
  faqs: FAQ[];
  loading: boolean;
  error: string | null;
}

const initialState: FAQState = {
  faqs: [],
  loading: false,
  error: null,
};

const faqSlice = createSlice({
  name: "faqs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFAQs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFAQs.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs = action.payload;
      })
      .addCase(fetchFAQs.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch FAQs.";
      })

      .addCase(createFAQ.fulfilled, (state, action) => {
        state.faqs.push(action.payload);
      })

      .addCase(editFAQ.fulfilled, (state, action) => {
        state.faqs = state.faqs.map((faq) =>
          faq._id === action.payload._id ? action.payload : faq
        );
      })

      .addCase(removeFAQ.fulfilled, (state, action) => {
        state.faqs = state.faqs.filter((faq) => faq._id !== action.payload);
      });
  },
});

export default faqSlice.reducer;
