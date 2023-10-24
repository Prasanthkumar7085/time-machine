import { createSlice } from "@reduxjs/toolkit";
import { createGame, getGames, startGame, updateGame } from "./gameActions";

const initialState = {
  name: undefined,
  type: undefined,
  answers: [],
  gamesHistory: {},
  selectedType: undefined,
  selectedGameId: undefined,
};

const tempInitalState = {
  answers: [],
  finished: false,
  _id: "64ea12195c38111ba163fec1",
  name: "asqar",
  type: "co2-concentrations",
  user: "64ea06884ee39501df15dbf6",
};

const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    updateSelectedGame(state, { payload }) {
      return {
        ...state,
        selectedGameId: payload.selectedGameId,
        selectedType: payload.selectedType,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createGame.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createGame.fulfilled, (state, { payload }) => {
      return {
        ...state,
        ...payload,
        loading: false,
        success: true,
      };
    });
    builder.addCase(createGame.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(startGame.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(startGame.fulfilled, (state, { payload }) => {
      return {
        ...state,
        ...payload,
        loading: false,
        success: true,
      };
    });
    builder.addCase(startGame.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(updateGame.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateGame.fulfilled, (state, { payload }) => {
      return {
        ...state,
        answers: [...payload.answers],
        finished: payload.finished,
        loading: false,
        success: true,
      };
    });
    builder.addCase(updateGame.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(getGames.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getGames.fulfilled, (state, { payload }) => {
      return {
        ...state,
        gamesHistory: payload,
        loading: false,
        success: true,
      };
    });
    builder.addCase(getGames.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { updateSelectedGame } = gameSlice.actions;
export default gameSlice.reducer;
