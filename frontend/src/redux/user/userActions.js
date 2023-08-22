import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { router } from "../../router/Router";
import { backendURL } from "../../utils/constants";

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
        config
      );

      localStorage.setItem(
        "time-machine",
        JSON.stringify({
          access: data.tokens.access.token,
          refresh: data.tokens.refresh.token,
        })
      );

      router.navigate("/disclaimer");

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
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
        config
      );

      localStorage.setItem(
        "time-machine",
        JSON.stringify({
          access: data.tokens.access.token,
          refresh: data.tokens.refresh.token,
        })
      );

      router.navigate("/disclaimer");
      console.log(data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const acceptDisclaimer = createAsyncThunk(
  "auth/disclaimer",
  async (__, { rejectWithValue, getState }) => {
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
        { email: state.user.email },
        config
      );

      router.navigate("/demographics");

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
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
        config
      );

      localStorage.removeItem("time-machine");

      router.navigate("/login");
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
