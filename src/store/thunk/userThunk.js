import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axios";
import Cookies from "js-cookie";

// Thunk for Fetching and updating user data
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/auth/fetchUserData");
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // Set cookie directly with js-cookie
      Cookies.set("userId", response.data.user._id, { expires: 7 }); // Expires in 7 days

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error in fetching userData"
      );
    }
  }
);

// Thunk for updating user data
export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.put("/auth/updateUserData", data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error in updating user"
      );
    }
  }
);
