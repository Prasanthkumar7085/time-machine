export const backendURL = process.env.REACT_APP_HOST;

export const GAME_TYPES = [
  "co2-concentrations",
  "infant-mortality-rate",
  "non-state-conflict",
  "us-poverty",
];

export const GAME_STEPS = {
  "co2-concentrations": 3,
  "infant-mortality-rate": 1,
  "non-state-conflict": 1,
  "us-poverty": 1,
};

export const GAME_STARTING_YEAR = {
  "co2-concentrations": 1980,
  "infant-mortality-rate": 1980,
  "non-state-conflict": 1980,
  "us-poverty": 1980,
};
