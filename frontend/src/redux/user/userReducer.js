import { createSlice } from "@reduxjs/toolkit";
import {
  acceptDisclaimer,
  loginUser,
  logoutUser,
  registerUser,
} from "./userActions";

const initialState = {
  email: undefined,
  password: undefined,
  isDisclaimerAccepted: false,
  gameCompletionCount: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile(state, { payload }) {
      return {
        ...state,
        ...payload.user,
        tokens: payload.tokens,
      };
    },
    updateScientistName(state, { payload }) {
      return {
        ...state,
        scientistName: payload.scientistName,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      return {
        ...state,
        ...payload.user,
        tokens: payload.tokens,
        loading: false,
        success: true,
      };
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      return {
        ...state,
        ...payload.user,
        tokens: payload.tokens,
        loading: false,
        success: true,
      };
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, () => {
      return {
        ...initialState,
        loading: false,
        success: true,
      };
    });
    builder.addCase(logoutUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(acceptDisclaimer.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(acceptDisclaimer.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isDisclaimerAccepted: payload.user.isDisclaimerAccepted,
        loading: false,
        success: true,
      };
    });
    builder.addCase(acceptDisclaimer.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { updateProfile, updateScientistName } = userSlice.actions;
export default userSlice.reducer;
