import { createSlice } from "@reduxjs/toolkit";
import { albumTitleExist, createAlbum } from "./thunk/albumThunk";

const initialState = {
  allAlbums: null,
  loading: null,
  error: null,
  status: null,
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Album
    builder
      .addCase(createAlbum.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createAlbum.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createAlbum.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    // albumTitleExist
    builder
      .addCase(albumTitleExist.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(albumTitleExist.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(albumTitleExist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {} = albumSlice.actions;

export default albumSlice.reducer;
