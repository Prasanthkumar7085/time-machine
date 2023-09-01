import { createSlice } from "@reduxjs/toolkit";
import { createGame, updateGame } from "./gameActions";

const initialState = {
  name: undefined,
  type: undefined,
  answers: [],
};

const tempInitalState = {
  answers: [],
  finished: false,
  _id: "64ea12195c38111ba163fec1",
  name: "asqar",
  type: "co2-concentrations",
  user: "64ea06884ee39501df15dbf6",
};

// answers: [
//   {
//     guessCenter: {
//       type: Number,
//       required: true,
//     },
//     guessRange: {
//       type: Number,
//       required: true,
//     },
//     correctAnswer: {
//       type: Number,
//       required: true,
//     },
//     predictiveAccuracy: {
//       type: Number,
//       required: true,
//     },
//     confidentBandAccuracy: {
//       type: Number,
//       required: true,
//     },
//     percisionOfConfidentBand: {
//       type: Number,
//       required: true,
//     },
//     year: {
//       type: Number,
//       required: true,
//     },
//   },
// ],

const gameSlice = createSlice({
  name: "game",
  initialState: tempInitalState,
  reducers: {},
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
    builder.addCase(updateGame.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateGame.fulfilled, (state, { payload }) => {
      return {
        ...state,
        ...payload,
        loading: false,
        success: true,
      };
    });
    builder.addCase(updateGame.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default gameSlice.reducer;
