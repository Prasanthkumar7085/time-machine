import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { backendURL } from "../../utils/constants";
import { errorHandler } from "../../utils/utils";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/v1/auth/register`,
        { email, password },
        config,
      );

      localStorage.setItem(
        "time-machine",
        JSON.stringify({
          access: data.tokens.access.token,
          refresh: data.tokens.refresh.token,
        }),
      );

      return data;
    } catch (error) {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/v1/auth/login`,
        { email, password },
        config,
      );

      localStorage.setItem(
        "time-machine",
        JSON.stringify({
          access: data.tokens.access.token,
          refresh: data.tokens.refresh.token,
        }),
      );

      return data;
    } catch (error) {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const acceptDisclaimer = createAsyncThunk(
  "auth/disclaimer",
  async ({ osfConsent }, { rejectWithValue, getState }) => {
    const state = getState();
    const tokens = JSON.parse(localStorage.getItem("time-machine"));
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access}`,
        },
      };
      const { data } = await axios.post(
        `${backendURL}/v1/auth/update-disclaimer`,
        { email: state.user.email, osfConsent },
        config,
      );

      return data;
    } catch (error) {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (__, { rejectWithValue }) => {
    const tokens = JSON.parse(localStorage.getItem("time-machine"));
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${backendURL}/v1/auth/logout`,
        {
          refreshToken: tokens.refresh,
        },
        config,
      );

      localStorage.removeItem("time-machine");
    } catch (error) {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);
