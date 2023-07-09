import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./userActions";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: undefined,
    password: undefined,
    isDisclaimerAccepted: false,
    gameCompletionCount: 0,
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
  },
});

export const { incremented, decremented } = userSlice.actions;
export default userSlice.reducer;
