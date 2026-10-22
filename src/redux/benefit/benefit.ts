import { API_BASE } from "../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${API_BASE}/api/benefits`;

export const fetchBenefits = createAsyncThunk("benefits/fetchBenefits", async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
});

export const createBenefit = createAsyncThunk("benefits/createBenefit", async (formData: FormData) => {
  const response = await axios.post(API_URL, formData);
  return response.data.data; 
});

export const editBenefit = createAsyncThunk(
  "benefits/editBenefit",
  async ({ id, formData }: { id: string; formData: FormData }) => {
    const response = await axios.put(`${API_URL}/${id}`, formData);
    return response.data.data;
  }
);

export const removeBenefit = createAsyncThunk("benefits/removeBenefit", async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});
