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

//Thunk for getAllPlaylistOfUser
export const getAllPlaylistOfUser = createAsyncThunk(
  "playlist/getAllPlaylistOfUser",
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/playlist/getAllPlaylistOfUser`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error in Fetching user playlists"
      );
    }
  }
);

//Thunk for getAllPlaylist
export const getAllPlaylist = createAsyncThunk(
  "playlist/getAllPlaylist",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      const response = await axiosInstance.get(
        `/playlist/getAllPlaylist?page=${data.page}&limit=${data.limit}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error in Fetching all playlists"
      );
    }
  }
);
