import { useNavigate } from "react-router-dom";
import { InfoIcon } from "./Question";

const Results = ({
  predictiveAccuracy,
  confidentBandAccuracy,
  percisionOfConfidentBand,
  setHasResults,
  finished,
  answer,
}) => {
  const navigate = useNavigate();
  return (
    <div className="mockup-window bg-base-300 backdrop-blur-sm w-5/6">
      <div className="p-2">
        <div className="p-2 py-0 text-slate-400">
          {finished ? (
            <>Congratulations! You have completed the game.</>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              The graph on the right shows your best guess and Estimate Zone and
              the realized outcome.
            </>
          )}
        </div>
        <div className="divider my-1"></div>
        <h3 className="px-2 text-xl">Your score for the last round:</h3>
        {answer && (
          <p className="px-2 py-2 text-base text-slate-400">
            Your answer was{" "}
            <span className="text-[#A8DF8E]">{answer.guessCenter}</span>. The
            real value was{" "}
            <span className="text-[#69b3a2]">{answer.correctAnswer}</span>.
          </p>
        )}
        <div className="w-full">
          <div className="stat place-items-center p-2">
            <div
              className="tooltip tooltip-bottom w-full"
              data-tip="Predict next year's data point. If you're spot on, you get 60 points. For every 1% off, you lose 0.6 points."
            >
              <div className="stat-title flex gap-2 whitespace-normal text-left">
                Predictive Accuracy
                <InfoIcon />
              </div>
            </div>
            <div className="stat-value mt-2 flex w-full">
              {predictiveAccuracy}
              <div className="ml-1 text-info text-2xl font-semibold">/60</div>
            </div>
          </div>

          <div className="stat place-items-center p-2">
            <div
              className="tooltip tooltip-bottom w-full"
              data-tip="Guess a range for the data point. If it's within, you get 30 points; if not, you get 0."
            >
              <div className="stat-title flex gap-2 whitespace-normal">
                Confidence Band Accuracy
                <InfoIcon />
              </div>
            </div>
            <div className="stat-value mt-2 flex w-full">
              {confidentBandAccuracy}
              <div className="ml-1 text-info text-2xl font-semibold">/30</div>
            </div>
          </div>

          <div className="stat place-items-center p-2">
            <div
              className="tooltip tooltip-bottom w-full"
              data-tip="Set a narrow range for better precision. If it's tighter than a set standard, you get 10 points. If wider, your points decrease proportionally."
            >
              <div className="stat-title flex gap-2 whitespace-normal">
                Precision of Confidence Band
                <InfoIcon />
              </div>
            </div>
            <div className="stat-value mt-2 flex w-full">
              {percisionOfConfidentBand}
              <div className="ml-1 text-info text-2xl font-semibold">/10</div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button
            onClick={() => {
              setHasResults(false);
              if (finished) {
                navigate("/summary");
              }
            }}
            className="btn btn-primary"
          >
            {finished ? "Done!" : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
