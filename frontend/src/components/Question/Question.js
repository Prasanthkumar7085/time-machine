import LineChart from "./Chart";
import data from "../../assets/data.json";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { createGame, updateGame } from "../../redux/game/gameActions";
import { GAME_STARTING_YEAR, GAME_STEPS } from "../../utils/constants";
import Terminal from "../Terminal";

function standardDeviation(numArray) {
  const mean = numArray.reduce((s, n) => s + n) / numArray.length;
  const variance =
    numArray.reduce((s, n) => s + (n - mean) ** 2, 0) / (numArray.length - 1);
  return Math.sqrt(variance);
}

export default function Question() {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [hasEstimate, setHasEstimate] = useState(false);
  const [lines, setLines] = useState([
    {
      type: "text",
      value:
        "Welcome to 1980. Post-It Notes and the Rubik’s Cube have just hit the stores.",
    },
    {
      type: "text",
      value:
        "Your job as a scientist in 1980 is to predict future global CO2 concentrations so humans can prepare for coming changes. Below, you can see historical data for global CO2 concentrations for the past 20 years in parts per million. Your task is to predict concentrations in 1985. After you make your prediction, we will time travel ahead to 1985 to see how accurate you were.",
    },
    {
      type: "text",
      value:
        "What will global CO2 concentrations be in 1985 (in parts per million)?",
    },
  ]);
  const game = useSelector((state) => state.game);
  const gameType = game.type;
  const gameId = game._id;
  const gameData = data[gameType];
  const estimateYear =
    GAME_STARTING_YEAR[gameType] + game.answers.length * GAME_STEPS[gameType];
  const gameIndex = gameData?.findIndex(
    (item) => item.date === String(estimateYear)
  );
  const dataToShow = gameData?.slice(0, gameIndex);

  const [chartData, setChartData] = useState([
    ...dataToShow,
    { date: String(estimateYear), value: null },
    { date: String(estimateYear + GAME_STEPS[gameType]), value: null },
  ]);

  const updateChartData = (value, estimateMargin) => {
    const newData = [...chartData];
    const updatedData = newData.map((item, index) => {
      if (index === newData.length - 2) {
        return { ...item, value: String(value.toFixed(2)), estimateMargin };
      }
      return item;
    });
    setChartData(updatedData);
    setHasEstimate(true);
    setLines((prevData) => {
      return [
        ...prevData,
        {
          type: "info",
          value:
            "[Optional]: You can explain the rational behind your estimation here.",
        },
      ];
    });
  };

  const submitAnswer = useCallback(
    (value) => {
      if (!hasEstimate) {
        setLines((prevData) => {
          return [
            ...prevData,
            {
              type: "error",
              value:
                "Please provide an estimate before submitting your answer.",
            },
          ];
        });
      }
      const explanation = value.substring(2);
      const guessCenter = Number(chartData[chartData.length - 2].value);
      const guessRange = Number(chartData[chartData.length - 2].estimateMargin);
      const correctAnswer = Number(gameData[chartData.length - 1].value);
      const predictiveAccuracy =
        60 *
        (1 -
          Math.min(Math.abs(guessCenter - correctAnswer), correctAnswer) /
            correctAnswer);
      const confidentBandAccuracy =
        guessCenter + guessRange < correctAnswer ||
        guessCenter - guessRange > correctAnswer
          ? 30
          : 0;
      const sd = standardDeviation(
        chartData.slice(-2).map((item) => Number(item.value))
      );
      const percisionOfConfidentBand =
        guessRange - sd < 0 ? 10 : 10 - sd / guessRange;
      const answer = {
        guessCenter,
        guessRange,
        correctAnswer,
        predictiveAccuracy,
        confidentBandAccuracy,
        percisionOfConfidentBand,
        year: estimateYear,
        explanation,
      };
      dispatch(updateGame({ answer, gameId }));
    },
    [chartData, gameData, hasEstimate, estimateYear, gameId]
  );

  return (
    <div className="flex w-full h-[calc(100%-4rem)] p-10 ">
      <div className="h-full w-full flex relative shadow-md rounded-md overflow-hidden bg-[#191D24]">
        <div className="h-full w-[34%]">
          <Terminal
            lines={lines}
            hasEstimate={hasEstimate}
            submitAnswer={submitAnswer}
            notRounded={true}
          />
        </div>
        <div
          className="w-[66%] h-full absolute top-0 right-0 flex items-center justify-center bg-[#191D24] px-10"
          ref={ref}
        >
          <div className="w-[full] h-[400px] flex-grow">
            {chartData.length > 0 && (
              <LineChart
                Data={chartData}
                updateChartData={updateChartData}
                chartRef={ref}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
