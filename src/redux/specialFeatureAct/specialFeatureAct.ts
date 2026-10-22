import { API_BASE } from "../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${API_BASE}/api/specialfeatures`;

export const fetchSpecialFeatures = createAsyncThunk("specialFeatures/fetch", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const addSpecialFeature = createAsyncThunk("specialFeatures/add", async (formData: FormData) => {
  const response = await axios.post(BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
});

export const editSpecialFeature = createAsyncThunk(
  "specialFeatures/edit",
  async ({ id, specialFeature }: { id: string; specialFeature: FormData }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, specialFeature, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);

export const removeSpecialFeature = createAsyncThunk(
  "specialFeatures/remove",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete special feature.");
    }
  }
);
