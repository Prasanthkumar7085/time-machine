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
              <div className="divider my-1"></div>

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
        <h3 className="uppercase font-primary font-bold md:text-[11px] xl:text-[13px] xxl:text-[15px] text-[#fff]">
          Your score:
        </h3>
        {answer && (
          <p className=" py-2  text-base text-[#fff] md:text-[11px] xl:text-[13px] xxl:text-[15px] font-primary leading-4">
            Your answer was{" "}
            <span className="text-[#A8DF8E] font-primary">
              {answer.guessCenter}.
            </span>
            <br /> The real value was{" "}
            <span className="text-[#69b3a2] font-primary">
              {answer.correctAnswer}
            </span>
            .
          </p>
        )}
        <div className="w-full  pt-8">
          <div className="stat w-[90%] p-0 mb-3">
            <div
              className="tooltip before:max-w-full tooltip-bottom w-full max-w-full text-left"
              data-tip="Predict next year's data point. If you're spot on, you get 60 points. For every 1% off, you lose 0.6 points."
            >
              <div className="stat-title flex gap-2 whitespace-normal justify-between text-[#FFFFFF80] items-center font-secondary md:text-[12px] xl:text-[15px] xxl:text-[17px]">
                <span> Predictive Accuracy</span>
                <InfoIcon />
              </div>
            </div>
            <div className="stat-value flex w-full font-primary  items-center  md:text-[20px] xl:text-[24px] xxl:text-[28px]">
              {predictiveAccuracy}
              <div className="ml-1 text-info font-primary">/60</div>
            </div>
          </div>

          <div className="stat  p-0 w-[90%] mb-3">
            <div
              className="tooltip before:max-w-full tooltip-bottom w-full max-w-full text-left"
              data-tip="Guess a range for the data point. If it's within, you get 30 points; if not, you get 0."
            >
              <div className="stat-title flex gap-2 whitespace-normal justify-between text-[#FFFFFF80] font-secondary md:text-[12px] xl:text-[15px] xxl:text-[17px]">
                Confidence Band Accuracy
                <InfoIcon />
              </div>
            </div>
            <div className="stat-value  flex w-full font-primary   md:text-[20px] xl:text-[24px] xxl:text-[28px]">
              {confidentBandAccuracy}
              <div className="ml-1 text-info font-primary">/30</div>
            </div>
          </div>

          <div className="stat p-0 w-[90%]">
            <div
              className="tooltip before:max-w-full  tooltip-bottom w-full max-w-full text-left"
              data-tip="Set a narrow range for better precision. If it's tighter than a set standard, you get 10 points. If wider, your points decrease proportionally."
            >
              <div className="stat-title flex gap-2 whitespace-normal justify-between text-[#FFFFFF80] items-start font-secondary md:text-[12px] xl:text-[15px] xxl:text-[17px]">
                Precision of Confidence Band
                <InfoIcon />
              </div>
            </div>
            <div className="stat-value  flex w-full font-primary   md:text-[20px] xl:text-[24px] xxl:text-[28px]">
              {percisionOfConfidentBand}
              <div className="ml-1 text-info font-semibold">/10</div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-[5em] sticky bottom-0">
          <button
            onClick={() => {
              setHasResults(false);
              if (finished) {
                navigate("/summary");
              }
            }}
            className="btn bg-[#3b46de] font-[600] w-full text-white hover:bg-[#3b46de] md:text-[13px] xl:text-[15px] xxl:text-[18px] font-secondary"
          >
            {finished ? "Done!" : "Next question"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
