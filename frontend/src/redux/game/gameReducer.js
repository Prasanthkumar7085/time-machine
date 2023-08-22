import { createSlice } from "@reduxjs/toolkit";
import { createGame } from "./gameActions";

const initialState = {
  name: undefined,
  type: undefined,
  answers: [],
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
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// export const { updateProfile } = gameSlice.actions;
export default gameSlice.reducer;
