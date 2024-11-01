import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axios";

// Thunk for Song upload
export const uploadSong = createAsyncThunk(
  "song/upload-song",
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/song/upload-song`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error in uploading song"
      );
    }
  }
);
