import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axios";

// Thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login Failed"
      );
    }
  }
);

export const register = createAsyncThunk(
  "auth/register", // Unique action name
  async (userInfo, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/auth/register`, userInfo);

      return response.data; // Will be the fulfilled action's payload
    } catch (error) {
      // Return the error message if available
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue("Registration Failed");
      }
    }
  }
);

// Thunk for verifying email
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/auth/verifyemail?token=${token}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Email Verification Failed"
      );
    }
  }
);

// Thunk for Send Verification Email
export const sendVerificationEmail = createAsyncThunk(
  "auth/sendVerificationEmail",
  async (email, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/auth/sendVerificationEmail?email=${email}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Email Verification Failed"
      );
    }
  }
);
