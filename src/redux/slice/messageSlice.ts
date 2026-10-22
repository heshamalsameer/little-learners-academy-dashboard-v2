import { API_BASE } from "../../services/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${API_BASE}/api/message`;

type MessageState = {
  messages: any[];
  selectedMessage: any | null;
  loadingStatus: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;
};

const initialState: MessageState = {
  messages: [],
  selectedMessage: null,
  loadingStatus: "Idle",
  error: null,
};

export const fetchMessages = createAsyncThunk("messages/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_URL);
    const body = response.data;
    return Array.isArray(body) ? body : Array.isArray(body?.data) ? body.data : [];
  } catch (error) {
    return thunkAPI.rejectWithValue(
      axios.isAxiosError(error) ? error.response?.data?.message || "Failed to fetch messages" : "An error occurred"
    );
  }
});

export const fetchMessageById = createAsyncThunk("messages/fetchById", async (id: string, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch the message");
  }
});

export const deleteMessage = createAsyncThunk("messages/delete", async (id: string, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete the message");
  }
});

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loadingStatus = "Pending";
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loadingStatus = "Success";
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loadingStatus = "Fail";
        state.error = action.payload as string;
      })
      .addCase(fetchMessageById.pending, (state) => {
        state.loadingStatus = "Pending";
        state.error = null;
      })
      .addCase(fetchMessageById.fulfilled, (state, action) => {
        state.loadingStatus = "Success";
        state.selectedMessage = action.payload;
      })
      .addCase(fetchMessageById.rejected, (state, action) => {
        state.loadingStatus = "Fail";
        state.error = action.payload as string;
      })
     
      .addCase(deleteMessage.pending, (state) => {
        state.loadingStatus = "Pending";
        state.error = null;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.loadingStatus = "Success";
        state.messages = state.messages.filter((msg) => msg._id !== action.payload);
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.loadingStatus = "Fail";
        state.error = action.payload as string;
      });
  },
});

export default messageSlice.reducer;
