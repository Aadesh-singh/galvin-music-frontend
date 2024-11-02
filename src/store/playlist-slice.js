import { createSlice } from "@reduxjs/toolkit";
import { createPlaylist, playlistTitleExist } from "./thunk/playlistThunk";

const initialState = {
  allPlaylist: null,
  loading: null,
  error: null,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // PlaylistTitleExist
    builder
      .addCase(playlistTitleExist.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(playlistTitleExist.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(playlistTitleExist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // createPlaylist
    builder
      .addCase(createPlaylist.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createPlaylist.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {} = playlistSlice.actions;

export default playlistSlice.reducer;
