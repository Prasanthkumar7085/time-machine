import classNames from "classnames";
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
    <div
      className={classNames(
        "mockup-code h-full w-full min-w-0 shadow-lg border-r border-r-[rgba(255,255,255,0.1)] overflow-auto pb-0 bg-[#191D24]",
      )}
    >
      <div className="p-2">
        <div className="w-full text-white md:text-[11px] xl:text-[13px] xxl:text-[15px] font-normal font-primary leading-[20px] ">
          {finished ? (
            <>Congratulations! You have completed the game.</>
          ) : (
            <>
              The graph on the right shows your best guess and Estimate Zone and
              the realized outcome.
            </>
          )}
        </div>
        <div className="divider my-1"></div>
        <h3 className="px-5 text-xl font-primary font-bold text-[#fff]">
          Your score :
        </h3>
        {answer && (
          <p className="px-5 py-2  text-base text-[#fff]">
            Your answer was{" "}
            <span className="text-[#A8DF8E] font-primary">
              {answer.guessCenter}
            </span>
            <br /> The real value was{" "}
            <span className="text-[#69b3a2] font-primary">
              {answer.correctAnswer}
            </span>
            .
          </p>
        )}
        <div className="w-full px-2 pt-3">
          <div className="stat place-items-center p-2 w-[80%]">
            <div
              className="tooltip tooltip-bottom w-full"
              data-tip="Predict next year's data point. If you're spot on, you get 60 points. For every 1% off, you lose 0.6 points."
            >
              <div className="stat-title flex gap-2 whitespace-normal justify-between items-center font-[SF Pro Display]">
                <span> Predictive Accuracy</span>
                <InfoIcon />
              </div>
            </div>
            <div className="stat-value mt-2 flex w-full font-primary">
              {predictiveAccuracy}
              <div className="ml-1 text-info font-primary">/60</div>
            </div>
          </div>

          <div className="stat place-items-center p-2 w-[80%]">
            <div
              className="tooltip tooltip-bottom w-full"
              data-tip="Guess a range for the data point. If it's within, you get 30 points; if not, you get 0."
            >
              <div className="stat-title flex gap-2 whitespace-normal justify-between items-center font-[SF Pro Display]">
                Confidence Band Accuracy
                <InfoIcon />
              </div>
            </div>
            <div className="stat-value mt-2 flex w-full font-primary">
              {confidentBandAccuracy}
              <div className="ml-1 text-info font-primary">/30</div>
            </div>
          </div>

          <div className="stat place-items-center p-2  w-[80%]">
            <div
              className="tooltip tooltip-bottom w-full"
              data-tip="Set a narrow range for better precision. If it's tighter than a set standard, you get 10 points. If wider, your points decrease proportionally."
            >
              <div className="stat-title flex gap-2 whitespace-normal justify-between items-center font-[SF Pro Display]">
                Precision of Confidence Band
                <InfoIcon />
              </div>
            </div>
            <div className="stat-value mt-2 flex w-full font-primary">
              {percisionOfConfidentBand}
              <div className="ml-1 text-info font-semibold">/10</div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-[3rem]">
          <button
            onClick={() => {
              setHasResults(false);
              if (finished) {
                navigate("/summary");
              }
            }}
            className="btn bg-[#3b46de] w-[80%] text-white hover:bg-[#3b46de]"
          >
            {finished ? "Done!" : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
