import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userReducer";
import gameReducer from "./game/gameReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
  },
});
