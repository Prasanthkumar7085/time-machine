import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendURL } from "../../utils/constants";
import { errorHandler } from "../../utils/utils";
import { toast } from "react-hot-toast";

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
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateGame = createAsyncThunk(
  "game/update",
  async ({ answer, gameId, finished }, { rejectWithValue }) => {
    const tokens = JSON.parse(localStorage.getItem("time-machine"));
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access}`,
        },
      };
      const { data } = await axios.post(
        `${backendURL}/v1/game/update-game/${gameId}`,
        { answer, finished },
        config
      );

      return data;
    } catch (error) {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
