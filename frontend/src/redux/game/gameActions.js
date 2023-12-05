import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { backendURL } from "../../utils/constants";
import { errorHandler } from "../../utils/utils";

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

export const startGame = createAsyncThunk(
  "game/start",
  async ({ scientistName, gameId, selectedType }, { rejectWithValue }) => {
    const tokens = JSON.parse(localStorage.getItem("time-machine"));
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access}`,
        },
      };
      const { data } = await axios.post(
        `${backendURL}/v1/game/start`,
        { name: scientistName, gameId, gameType: selectedType },
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

const findGame = (games, type) => {
  const finishedGame = games.find(
    (game) => game.type === type && game.finished,
  );
  if (finishedGame) {
    return finishedGame;
  }
  const startedGame = games.find((game) => game.type === type && game.started);
  if (startedGame) {
    return startedGame;
  }
  return { id: null, type, finished: false, started: false };
};

export const getGames = createAsyncThunk(
  "game/getall",
  async (__, { rejectWithValue }) => {
    const tokens = JSON.parse(localStorage.getItem("time-machine"));
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access}`,
        },
      };
      const { data } = await axios.get(`${backendURL}/v1/game/get`, config);

      const res = data.map((game) => {
        const { id, type, finished, answers } = game;
        return { id, type, finished, started: answers.length > 0, answers };
      });

      const resObj = {
        "co2-concentrations": findGame(res, "co2-concentrations"),
        "infant-mortality-rate": findGame(res, "infant-mortality-rate"),
        "non-state-conflict": findGame(res, "non-state-conflict"),
        "us-poverty": findGame(res, "us-poverty"),
      };

      return resObj;
    } catch (error) {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
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
