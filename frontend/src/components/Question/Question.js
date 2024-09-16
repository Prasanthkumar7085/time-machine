import classNames from "classnames";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import data from "../../assets/data.json";
import { updateGame } from "../../redux/game/gameActions";
import {
  gameBodyGenerator,
  gameLinkingTextGenerator,
  gameNoteGenerator,
  gameQuestionGenerator,
  GAME_ROUNDS,
  GAME_STARTING_YEAR,
  GAME_STEPS,
} from "../../utils/constants";
import Terminal from "../Terminal";
import LineChart from "./Chart";
import Results from "./Results";

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
      0,
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
    className="stroke-current shrink-0 w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

export default function Question() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  const [hasEstimate, setHasEstimate] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [lines, setLines] = useState([]);
  const [chartData, setChartData] = useState([]);
  const game = useSelector((state) => state.game);
  const gameType = game.type;
  const gameId = game.id;
  const gameData = data[gameType];
  const estimateYear = useMemo(
    () =>
      GAME_STARTING_YEAR[gameType] + game.answers.length * GAME_STEPS[gameType],
    [gameType, game.answers.length],
  );
  const gameIndex = gameData?.findIndex(
    (item) => item.date === String(estimateYear),
  );
  const dataToShow = gameId ? gameData?.slice(0, gameIndex) : [];
  const answers = game.answers;

  useEffect(() => {
    if (!gameId) {
      navigate("/scientist-name");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);

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
      ...(answers.length === 0
        ? [
            {
              type: "text",
              value: gameBodyGenerator(
                estimateYear,
                gameType,
                dataToShow.length,
              ),
              time: generateRandomTime(),
            },
          ]
        : []),
      {
        type: "text-bold",
        value: gameLinkingTextGenerator(
          estimateYear - GAME_STEPS[gameType],
          estimateYear,
          gameType,
        ),
        time: generateRandomTime(),
      },
      {
        type: "text-bold",
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
        60,
      );
      const confidentBandAccuracy = confidenceBandScore(
        guessCenter - guessRange,
        guessCenter + guessRange,
        correctAnswer,
        30,
      );
      const sd = standardDeviation(chartData.slice(-2));
      const percisionOfConfidentBand = precisionScore(
        guessCenter - guessRange,
        guessCenter + guessRange,
        sd / 4,
        10,
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
        setFinished(finished);
        setHasResult(true);
      });
      setHasEstimate(false);
    },
    [chartData, gameData, hasEstimate, estimateYear, gameId, answers, gameType],
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
    <div className="flex w-full h-[calc(100%-5rem)] pl-3 pr-3 pt-2 flex-col">
      <div className="flex justify-center items-center p-5 absolute top-0 left-[35%]">
        <p>Progress:</p>
        <ul className="steps">
          <li
            data-content="1"
            className={classNames("step step-neutral", {
              "step-success": answers.length > 0,
            })}
            {...(answers.length > 0 && { "data-content": "✓" })}
          ></li>
          <li
            data-content="2"
            className={classNames("step step-neutral", {
              "step-success": answers.length > 1,
            })}
            {...(answers.length > 1 && { "data-content": "✓" })}
          ></li>
          <li
            data-content="3"
            className={classNames("step step-neutral", {
              "step-success": answers.length > 2,
            })}
            {...(answers.length > 2 && { "data-content": "✓" })}
          ></li>
          <li
            data-content="4"
            className={classNames("step step-neutral", {
              "step-success": answers.length > 3,
            })}
            {...(answers.length > 3 && { "data-content": "✓" })}
          ></li>
          <li
            data-content="5"
            className={classNames("step step-neutral", {
              "step-success": answers.length > 4,
            })}
            {...(answers.length > 4 && { "data-content": "✓" })}
          ></li>
        </ul>
      </div>
      <div className="h-full w-full flex relative shadow-md rounded-md overflow-hidden bg-[#191D24]">
        <div className="h-full w-[28%] relative">
          {hasResult ? (
            <div className="w-full h-full left-0 top-0 flex justify-center items-center backdrop-blur-[2px]">
              <Results
                predictiveAccuracy={answers[
                  answers.length - 1
                ].predictiveAccuracy.toFixed(2)}
                confidentBandAccuracy={answers[
                  answers.length - 1
                ].confidentBandAccuracy.toFixed(2)}
                percisionOfConfidentBand={answers[
                  answers.length - 1
                ].percisionOfConfidentBand.toFixed(2)}
                setHasResults={setHasResult}
                finished={finished}
                answer={answers[answers.length - 1]}
              />
            </div>
          ) : (
            <Terminal
              lines={lines}
              hasEstimate={hasEstimate}
              submitAnswer={submitAnswer}
              notRounded={true}
              finished={finished}
            />
          )}
        </div>
        <div
          className="w-[72%] h-full relative top-0 right-0 flex items-center justify-center bg-[#191D24] px-10 flex-col"
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            if (hasResult) {
              toast.error(
                "You have already submitted your answer. Please click on 'Next Question' to continue.",
              );
            }
          }}
        >
          <div className="stats bg-transparent w-full top-0 overflow-hidden">
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
            </div>
          </div>
          <div
            className={classNames(
              "w-full  flex-grow",
              hasResult
                ? "pointer-events-none cursor-not-allowed"
                : "pointer-events-auto",
            )}
          >
            {chartData.length > 0 && (
              <LineChart
                Data={chartData}
                updateChartData={updateChartData}
                answers={answers}
                chartRef={ref}
                hasResult={hasResult}
                hasEstimate={hasEstimate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
