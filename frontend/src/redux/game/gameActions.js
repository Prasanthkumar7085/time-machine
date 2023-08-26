import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendURL } from "../../utils/constants";

export const createGame = createAsyncThunk(
  "game/create",
  async ({ scientistName }, { rejectWithValue }) => {
    const tokens = JSON.parse(localStorage.getItem("time-machine"));
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access}`,
        },
      };
      const { data } = await axios.post(
        `${backendURL}/v1/game/init`,
        { name: scientistName },
        config
      );

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
