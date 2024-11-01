import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPlaylist: null,
  loading: null,
  error: null,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: (builer) => {},
});

export const {} = playlistSlice.actions;

export default playlistSlice.reducer;
