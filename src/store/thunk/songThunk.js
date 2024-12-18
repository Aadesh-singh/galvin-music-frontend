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

// Thunk for getting all artists
export const getAllTrendingSongs = createAsyncThunk(
  "song/getAllSongs",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/song/getAllSongs?page=${data.page}&limit=${data.limit}`
      ); //create backend
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error in getting all songs"
      );
    }
  }
);
// Thunk for fetchSong
export const fetchSong = createAsyncThunk(
  "song/fetchSong",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/song/fetchSong/${data.id}`); //create backend
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error in getting song"
      );
    }
  }
);
