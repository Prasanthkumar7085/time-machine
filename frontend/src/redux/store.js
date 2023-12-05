import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./game/gameReducer";
import userReducer from "./user/userReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
  },
});
