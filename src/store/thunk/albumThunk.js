import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axios";

//Thunk for create song
export const createAlbum = createAsyncThunk(
  "album/createAlbum",
  async (formdata, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/album/create-album`,
        formdata
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error in creating Album"
      );
    }
  }
);
//Thunk for albumTitleExist
export const albumTitleExist = createAsyncThunk(
  "album/albumTitleExist",
  async (name, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/album/albumTitleExist?title=${name}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error in creating Album"
      );
    }
  }
);
