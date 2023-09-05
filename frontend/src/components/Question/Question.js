import LineChart from "./Chart";
import data from "../../assets/data.json";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { createGame, updateGame } from "../../redux/game/gameActions";
import {
  GAME_STARTING_YEAR,
  GAME_STEPS,
  GAME_ROUNDS,
  gameBodyGenerator,
  gameNoteGenerator,
  gameQuestionGenerator,
} from "../../utils/constants";
import Terminal from "../Terminal";
import { useNavigate } from "react-router-dom";

function standardDeviation(numArray) {
  const mean = numArray.reduce((s, n) => s + n) / numArray.length;
  const variance =
    numArray.reduce((s, n) => s + (n - mean) ** 2, 0) / (numArray.length - 1);
  return Math.sqrt(variance);
}

function generateRandomTime() {
  var randomnum = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
  return randomnum;
}

export default function Question() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  const [hasEstimate, setHasEstimate] = useState(false);
  const [lines, setLines] = useState([]);
  const [chartData, setChartData] = useState([]);
  const game = useSelector((state) => state.game);
  const gameType = game.type;
  const gameId = game.id;
  const gameData = data[gameType];
  const estimateYear = useMemo(
    () =>
      GAME_STARTING_YEAR[gameType] + game.answers.length * GAME_STEPS[gameType],
    [gameType, game.answers.length]
  );
  const gameIndex = gameData?.findIndex(
    (item) => item.date === String(estimateYear)
  );
  const dataToShow = gameData?.slice(0, gameIndex);
  const answers = game.answers;

  useEffect(() => {
    setChartData([
      ...dataToShow,
      { date: String(estimateYear), value: null },
      { date: String(estimateYear + GAME_STEPS[gameType]), value: null },
    ]);

    const gameText = [
      {
        type: "text",
        value: gameNoteGenerator(estimateYear - GAME_STEPS[gameType]),
        time: generateRandomTime(),
      },
      ...(answers.length > 0 ? [] : []),
      ...(answers.length > 0
        ? [
            {
              type: "text",
              value: `Let's see how you did.
The graph on the right shows your best guess and Estimate Zone and the realized outcome. Here are your points for this round:`,
              time: generateRandomTime(),
            },
            {
              type: "list",
              value: [
                `Predictive Accuracy (60 points): ${answers[
                  answers.length - 1
                ].predictiveAccuracy.toFixed(2)}%`,
                `Confidence Band Accuracy (30 points): ${answers[
                  answers.length - 1
                ].confidentBandAccuracy.toFixed(2)}%`,
                `Precision of Confidence Band (10 points): ${answers[
                  answers.length - 1
                ].percisionOfConfidentBand.toFixed(2)}%`,
              ],
              time: generateRandomTime(),
            },
          ]
        : []),
      {
        type: "text",
        value: gameBodyGenerator(estimateYear, gameType, dataToShow.length),
        time: generateRandomTime(),
      },
      {
        type: "text",
        value: gameQuestionGenerator(estimateYear, gameType),
        time: generateRandomTime(),
      },
    ];

    setLines(gameText);
  }, [estimateYear]);

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
      if (
        prevData[prevData.length - 1].value ===
        "[Optional]: You can explain the rational behind your estimation here."
      ) {
        return prevData;
      }
      return [
        ...prevData,
        {
          type: "info",
          value:
            "[Optional]: You can explain the rational behind your estimation here.",
          time: generateRandomTime(),
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
          ? 0
          : 30;
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
      const finished = GAME_ROUNDS[gameType] === answers.length + 1;
      dispatch(updateGame({ answer, gameId, finished })).then(() => {
        if (finished) {
          navigate("/summary");
        }
      });
      setHasEstimate(false);
      if (finished) {
        setLines((prevData) => {
          return [
            ...prevData,
            {
              type: "text",
              value: "Congratulations! You have completed the game.",
              time: generateRandomTime(),
            },
          ];
        });
      }
    },
    [chartData, gameData, hasEstimate, estimateYear, gameId, answers, gameType]
  );

  return (
    <div className="flex w-full h-[calc(100%-4rem)] p-8 pt-2">
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
                answers={answers}
                chartRef={ref}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
