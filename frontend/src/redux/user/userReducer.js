import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser } from "./userActions";

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
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        ...payload.user,
        tokens: payload.tokens,
        loading: false,
        success: true,
      };
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        ...payload.user,
        tokens: payload.tokens,
        loading: false,
        success: true,
      };
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [logoutUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [logoutUser.fulfilled]: (state, { payload }) => {
      return {
        ...initialState,
        loading: false,
        success: true,
      };
    },
    [logoutUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { updateProfile } = userSlice.actions;
export default userSlice.reducer;
