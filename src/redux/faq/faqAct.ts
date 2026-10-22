import { API_BASE } from "../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFAQs = createAsyncThunk("faqs/fetchFAQs", async () => {
  const response = await axios.get(`${API_BASE}/api/commonquestions`);
  return response.data.data;
});

export const createFAQ = createAsyncThunk(
  "faqs/createFAQ",
  async (faq: { question: string; answer: string }) => {
    const response = await axios.post(`${API_BASE}/api/commonquestions`, faq);
    return response.data.data;
  }
);

export const editFAQ = createAsyncThunk(
  "faqs/editFAQ",
  async ({ id, faq }: { id: string; faq: { question: string; answer: string } }) => {
    const response = await axios.put(`${API_BASE}/api/commonquestions/${id}`, faq);
    return response.data.data;
  }
);

export const removeFAQ = createAsyncThunk("faqs/removeFAQ", async (id: string) => {
  await axios.delete(`${API_BASE}/api/commonquestions/${id}`);
  return id;
});
