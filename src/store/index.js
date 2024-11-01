import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import songReducer from "./song-slice";
import playlistReducer from "./playlist-slice";
import albumReducer from "./album-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    song: songReducer,
    playlist: playlistReducer,
    album: albumReducer,
  },
});

export default store;
