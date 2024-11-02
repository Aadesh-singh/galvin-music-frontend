import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axios";

//Thunk for create song
export const createPlaylist = createAsyncThunk(
  "playlist/createPlaylist",
  async (formdata, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/playlist/create-playlist`,
        formdata
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error in creating Playlist"
      );
    }
  }
);

//Thunk for playlistTitleExist
export const playlistTitleExist = createAsyncThunk(
  "playlist/playlistTitleExist",
  async (name, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/playlist/playlistTitleExist?title=${name}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error in creating playlist"
      );
    }
  }
);
