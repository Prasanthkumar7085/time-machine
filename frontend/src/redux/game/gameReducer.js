import { createSlice } from "@reduxjs/toolkit";
import { createGame } from "./gameActions";

const initialState = {
  name: undefined,
  type: undefined,
  answers: [],
};

const tempInitalState = {
  answers: [],
  finished: false,
  id: "64ed47079d54440c9f4d7730",
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
  },
});

export default gameSlice.reducer;
