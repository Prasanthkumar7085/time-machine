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

/**
 * Calculate the standard deviation for an array of objects where values are stored in item.value.
 *
 * @param {Array} data - Array of objects with a "value" property.
 * @returns {number} - Standard deviation of the values.
 */
function standardDeviation(data) {
  if (data.length === 0) {
    return 0;
  }

  // Calculate the mean
  let sum = data.reduce((acc, item) => acc + Number(item.value), 0);
  let mean = sum / data.length;

  // Calculate the variance
  let variance =
    data.reduce(
      (acc, item) => acc + Math.pow(Number(item.value) - mean, 2),
      0
    ) / data.length;

  // Return the standard deviation (square root of variance)
  return Math.sqrt(variance);
}

function generateRandomTime() {
  var randomnum = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
  return randomnum;
}

/**
 * Calculate player's score based on prediction accuracy.
 *
 * @param {number} prediction - Player's predicted data point for the next year.
 * @param {number} actual - Actual data point for the next year.
 * @param {number} [maxScore=60] - Maximum score a player can get. Default is 60.
 * @returns {number} - Player's score.
 */
function calculatePredectiveAccuracy(prediction, actual, maxScore = 60) {
  // Calculate the percentage error.
  const errorPercentage = Math.abs((prediction - actual) / actual) * 100;

  // Determine the accuracy percentage.
  const accuracyPercentage = 100 - errorPercentage;

  // Return the player's score based on accuracy percentage.
  return (accuracyPercentage / 100) * maxScore;
}

/**
 * Calculate player's score based on confidence band accuracy.
 *
 * @param {number} lowerBound - Lower bound of the player's confidence band.
 * @param {number} upperBound - Upper bound of the player's confidence band.
 * @param {number} actual - Actual data point for the next year.
 * @param {number} [maxScore=30] - Maximum score a player can get for this category. Default is 30.
 * @returns {number} - Player's score.
 */
function confidenceBandScore(lowerBound, upperBound, actual, maxScore = 30) {
  if (actual >= lowerBound && actual <= upperBound) {
    return maxScore;
  } else {
    return 0;
  }
}

/**
 * Calculate player's score based on the precision of their confidence band.
 *
 * @param {number} lowerBound - Lower bound of the player's confidence band.
 * @param {number} upperBound - Upper bound of the player's confidence band.
 * @param {number} threshold - Threshold for the precision, e.g., standard deviation of previous data points.
 * @param {number} [maxScore=10] - Maximum score a player can get for this category. Default is 10.
 * @returns {number} - Player's score.
 */
function precisionScore(lowerBound, upperBound, threshold, maxScore = 10) {
  const bandWidth = upperBound - lowerBound;

  // If bandWidth is less than or equal to threshold, return maxScore
  if (bandWidth <= threshold) {
    return maxScore;
  } else {
    // Proportionally decrease the score based on how much wider the bandWidth is compared to the threshold
    return maxScore * (threshold / bandWidth);
  }
}

export const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    class="stroke-current shrink-0 w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

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
      ...(answers.length > 0
        ? [
            {
              type: "text",
              value: `Let's see how you did.
The graph on the right shows your best guess and Estimate Zone and the realized outcome.`,
              time: generateRandomTime(),
            },
            {
              type: "list",
              value: [
                "Last round's points:",
                `Predictive Accuracy (60 points): ${answers[
                  answers.length - 1
                ].predictiveAccuracy.toFixed(2)}`,
                `Confidence Band Accuracy (30 points): ${answers[
                  answers.length - 1
                ].confidentBandAccuracy.toFixed(2)}`,
                `Precision of Confidence Band (10 points): ${answers[
                  answers.length - 1
                ].percisionOfConfidentBand.toFixed(2)}`,
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
        "[Optional]: You can explain the rationale behind your estimation here."
      ) {
        return prevData;
      }
      return [
        ...prevData,
        {
          type: "info",
          value:
            "[Optional]: You can explain the rationale behind your estimation here.",
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
      const correctAnswer = Number(gameData[chartData.length - 2].value);
      const predictiveAccuracy = calculatePredectiveAccuracy(
        guessCenter,
        correctAnswer,
        60
      );
      const confidentBandAccuracy = confidenceBandScore(
        guessCenter - guessRange,
        guessCenter + guessRange,
        correctAnswer,
        30
      );
      const sd = standardDeviation(chartData.slice(-2));
      const percisionOfConfidentBand = precisionScore(
        guessCenter - guessRange,
        guessCenter + guessRange,
        sd / 4,
        10
      );
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

  const averagePredictiveAccuracy = useMemo(() => {
    const total = answers.reduce((acc, answer) => {
      return acc + answer.predictiveAccuracy;
    }, 0);
    if (answers.length === 0) {
      return 0;
    }
    return (total / answers.length).toFixed(1);
  }, [answers]);

  const averageConfidentBandAccuracy = useMemo(() => {
    const total = answers.reduce((acc, answer) => {
      return acc + answer.confidentBandAccuracy;
    }, 0);
    if (answers.length === 0) {
      return 0;
    }
    return (total / answers.length).toFixed(1);
  }, [answers]);

  const averagePercisionOfConfidentBand = useMemo(() => {
    const total = answers.reduce((acc, answer) => {
      return acc + answer.percisionOfConfidentBand;
    }, 0);
    if (answers.length === 0) {
      return 0;
    }
    return (total / answers.length).toFixed(1);
  }, [answers]);

  return (
    <div className="flex w-full h-[calc(100%-4rem)] p-8 pt-2">
      <div className="h-full w-full flex relative shadow-md rounded-md overflow-hidden bg-[#191D24]">
        <div className="h-full w-[28%]">
          <Terminal
            lines={lines}
            hasEstimate={hasEstimate}
            submitAnswer={submitAnswer}
            notRounded={true}
          />
        </div>
        <div
          className="w-[72%] h-full relative top-0 right-0 flex items-center justify-center bg-[#191D24] px-10"
          ref={ref}
        >
          <div className="stats bg-transparent w-full absolute top-0 py-6 z-50">
            {/* <div className="pl-3 mb-1 w-full">
              <h2 className="text-2xl font-bold">Stats:</h2>
              <p className="text-gray-400 mt-1">
                The stats displayed represent the average of each measurement.
              </p>
            </div> */}
            <div className="stat place-items-center">
              <div
                className="tooltip tooltip-bottom"
                data-tip="Predict next year's data point. If you're spot on, you get 60 points. For every 1% off, you lose 0.6 points."
              >
                <div className="stat-title flex gap-2 whitespace-normal">
                  Average Predictive Accuracy
                  <InfoIcon />
                </div>
              </div>
              <div className="stat-value mt-2 flex">
                {averagePredictiveAccuracy}
                <div className="ml-1 text-info text-2xl font-semibold">/60</div>
              </div>
              {/* <div className="stat-desc">From January 1st to February 1st</div> */}
            </div>

            <div className="stat place-items-center">
              <div
                className="tooltip tooltip-bottom"
                data-tip="Guess a range for the data point. If it's within, you get 30 points; if not, you get 0."
              >
                <div className="stat-title flex gap-2 whitespace-normal">
                  Average Confidence Band Accuracy
                  <InfoIcon />
                </div>
              </div>
              <div className="stat-value mt-2 flex">
                {averageConfidentBandAccuracy}
                <div className="ml-1 text-info text-2xl font-semibold">/30</div>
              </div>
              {/* <div className="stat-desc text-secondary">↗︎ 40 (2%)</div> */}
            </div>

            <div className="stat place-items-center">
              <div
                className="tooltip tooltip-bottom"
                data-tip="Set a narrow range for better precision. If it's tighter than a set standard, you get 10 points. If wider, your points decrease proportionally."
              >
                <div className="stat-title flex gap-2 whitespace-normal">
                  Average Precision of Confidence Band
                  <InfoIcon />
                </div>
              </div>
              <div className="stat-value mt-2 flex">
                {averagePercisionOfConfidentBand}
                <div className="ml-1 text-info text-2xl font-semibold">/10</div>
              </div>

              {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
            </div>
          </div>
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
