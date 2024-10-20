import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  register,
  verifyEmail,
  sendVerificationEmail,
  loginWithGoogle,
} from "./thunk/authThunk";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    restoreAuthState(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Google Login
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Verify Email
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Resend Verify Email
    builder
      .addCase(sendVerificationEmail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(sendVerificationEmail.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { restoreAuthState, logout } = authSlice.actions;

// export const authActions = authSlice.actions;

export default authSlice.reducer;
