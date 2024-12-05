import { createSlice } from "@reduxjs/toolkit";
import { getAllTrendingSongs, uploadSong } from "./thunk/songThunk";

const initialState = {
  currentSong: null,
  isSongPlaying: false,
  loading: false,
  error: null,
};

const songSlice = createSlice({
  name: "song",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Upload song
    builder
      .addCase(uploadSong.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(uploadSong.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(uploadSong.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    // getAllTrendingSongs
    builder
      .addCase(getAllTrendingSongs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllTrendingSongs.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(getAllTrendingSongs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// export const {} = songSlice.actions;

export default songSlice.reducer;
