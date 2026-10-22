import { createSlice } from "@reduxjs/toolkit";
import { fetchHistories, createHistory, editHistory, removeHistory } from "../history/historyAct";

interface History {
  _id: string;
  year: number;
  title: string;
  description: string;
}

interface HistoryState {
  histories: History[];
  loading: boolean;
  error: string | null;
}

const initialState: HistoryState = {
  histories: [],
  loading: false,
  error: null,
};

const historySlice = createSlice({
  name: "histories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistories.fulfilled, (state, action) => {
        state.loading = false;
        state.histories = Array.isArray(action.payload) ? action.payload : []; 
      })
      
      .addCase(fetchHistories.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch histories.";
      })
      .addCase(createHistory.fulfilled, (state, action) => {
        state.histories.push(action.payload); 
      })
      .addCase(editHistory.fulfilled, (state, action) => {
        state.histories = state.histories.map((history) =>
          history._id === action.payload._id ? action.payload : history
        );
      })
      .addCase(removeHistory.fulfilled, (state, action) => {
        state.histories = state.histories.filter((history) => history._id !== action.payload);
      });
  },
});

export default historySlice.reducer;
