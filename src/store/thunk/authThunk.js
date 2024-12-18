import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axios";
import Cookies from "js-cookie";

// Thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("expirationTime", new Date().getTime() + 3600000);
      // Set cookie directly with js-cookie
      Cookies.set("userId", response.data.user._id, { expires: 7 }); // Expires in 7 days

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

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (user, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/google-login", {
        userDetails: user,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("expirationTime", new Date().getTime() + 3600000); // Optional: store expiration time
      // Set cookie directly with js-cookie
      Cookies.set("userId", response.data.user._id, { expires: 7 }); // Expires in 7 days

      return response.data;
    } catch (error) {
      console.log("Error in getting auth token", error);
      return thunkAPI.rejectWithValue("Google login failed");
    }
  }
);

// Thunk for Send Verification Email
export const sendForgotPasswordLink = createAsyncThunk(
  "auth/sendForgotPasswordLink",
  async (email, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/auth/sendForgotPasswordLink?email=${email}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Password Reset Email not sent"
      );
    }
  }
);

// Thunk for Verifying token
export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (token, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/verifyToken?token=${token}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error in verifying token"
      );
    }
  }
);

// Thunk for Verifying token
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/auth/updatePassword`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error in verifying token"
      );
    }
  }
);
