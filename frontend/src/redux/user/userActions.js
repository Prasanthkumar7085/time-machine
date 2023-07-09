import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { router } from "../../router/Router";

const backendURL = process.env.REACT_APP_HOST;

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
