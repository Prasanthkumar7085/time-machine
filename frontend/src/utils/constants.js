import NOTES from "../assets/question-year.json";

export const backendURL = process.env.REACT_APP_BACKEND_URL;

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
  "infant-mortality-rate": 1997,
  "non-state-conflict": 2000,
  "us-poverty": 1970,
};

export const GAME_ROUNDS = {
  "co2-concentrations": 5,
  "infant-mortality-rate": 5,
  "non-state-conflict": 5,
  "us-poverty": 5,
};

export const gameQuestionGenerator = (year, type) => {
  switch (type) {
    case "co2-concentrations":
      return `What will global CO2 concentrations be in ${year} (in parts per million)?`;
    case "infant-mortality-rate":
      return `What will the global infant mortality rate be in ${year} (per 1000 live births)?`;
    case "non-state-conflict":
      return `How many non-state conflicts will there be in ${year}?`;
    case "us-poverty":
      return `What will the US poverty rate be in ${year} (in %)?`;
    default:
      return "";
  }
};

export const gameNoteGenerator = (year) => NOTES[year];

export const gameBodyGenerator = (year, type, dataPoints) => {
  const presentYear = year - GAME_STEPS[type];
  switch (type) {
    case "co2-concentrations":
      return `Your job as a scientist in ${presentYear} is to predict future global CO2 concentrations so humans can prepare for coming changes. Below, you can see historical data for global CO2 concentrations for the past ${dataPoints} years in parts per million. Your task is to predict concentrations in ${year}. After you make your prediction, we will time travel ahead to ${year} to see how accurate you were.`;
    case "infant-mortality-rate":
      return `Your job as a scientist in ${presentYear} is to predict future global infant mortality rates so humans can prepare for coming changes. Below, you can see historical data for global infant mortality rates for the past ${dataPoints} years per 1000 live births. Your task is to predict the infant mortality rate in ${year}. After you make your prediction, we will time travel ahead to ${year} to see how accurate you were.`;
    case "non-state-conflict":
      return `Your job as a scientist in ${presentYear} is to predict future global non-state conflicts so humans can prepare for coming changes. Below, you can see historical data for global non-state conflicts for the past ${dataPoints} years. Your task is to predict the number of non-state conflicts in ${year}. After you make your prediction, we will time travel ahead to ${year} to see how accurate you were.`;
    case "us-poverty":
      return `Your job as a scientist in ${presentYear} is to predict future US poverty rates so humans can prepare for coming changes. Below, you can see historical data for US poverty rates for the past ${dataPoints} years in %. Your task is to predict the US poverty rate in ${year}. After you make your prediction, we will time travel ahead to ${year} to see how accurate you were.`;
    default:
      return "";
  }
};
