import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CO2 from "../../assets/images/co2.png";
import Infant from "../../assets/images/infant.png";
import Conflict from "../../assets/images/nonstate.png";
import Poverty from "../../assets/images/poverty.png";
import { InfoIcon } from "../Question";

export default function Summary() {
  const { id } = useSelector((state) => state.user);
  const game = useSelector((state) => state.game);
  const gameType = game.type;
  const answers = game.answers;

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

  const getGameImage = (gameType) => {
    switch (gameType) {
      case "co2-concentrations":
        return CO2;
      case "infant-mortality-rate":
        return Infant;
      case "non-state-conflict":
        return Conflict;
      case "us-poverty":
        return Poverty;
      default:
        return CO2;
    }
  };

  const getGameTypeText = (gameType) => {
    switch (gameType) {
      case "co2-concentrations":
        return "CO2 Concentrations";
      case "infant-mortality-rate":
        return "Infant Mortality Rate";
      case "non-state-conflict":
        return "Non-State Conflict";
      case "us-poverty":
        return "US Poverty";
      default:
        return "CO2 Concentrations";
    }
  };

  return (
    <div className="hero h-[calc(100%-4rem)]">
      <div className="hero-content text-center">
        <div className="max-w-3xl">
          <div className="card card-side bg-base-100 shadow-xl mb-8 overflow-visible">
            <figure className="w-[200px] h-[200px] flex-shrink-0 flex-grow relative">
              <img src={getGameImage(gameType)} alt="game" />
              <p className="absolute px-4 text-lg text-white bg-[#191D24] rounded-md mx-2 left-0 bottom-2 w-auto h-auto">
                {getGameTypeText(gameType)}
              </p>
            </figure>
            <div className="card-body p-0 flex-row">
              <div className="stats w-full overflow-visible">
                <div className="stat place-items-center p-2">
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
                    <div className="ml-1 text-info text-2xl font-semibold">
                      /60
                    </div>
                  </div>
                  {/* <div className="stat-desc">From January 1st to February 1st</div> */}
                </div>

                <div className="stat place-items-center p-2">
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
                    <div className="ml-1 text-info text-2xl font-semibold">
                      /30
                    </div>
                  </div>
                  {/* <div className="stat-desc text-secondary">↗︎ 40 (2%)</div> */}
                </div>

                <div className="stat place-items-center p-2">
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
                    <div className="ml-1 text-info text-2xl font-semibold">
                      /10
                    </div>
                  </div>

                  {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-bold">Thanks!</h1>
          <p className="py-6">
            Thanks for participating in our experiment! We would appreciate if
            you could take 5 more minutes and fill the post study questionnaire.
            If you have already taken the questionnaire, you can close this tab
            or you can go back to categories and play other categories.
          </p>
          <a
            className="btn btn-primary"
            href={`https://uwaterloo.ca1.qualtrics.com/jfe/form/SV_00SP3SFYtHYq5uK?UserID==${id}`}
            target="_blank"
            rel="noreferrer"
          >
            Complete the Post Study Questionnaire
          </a>
          <Link to="/categories" className="btn btn-ghost ml-4">
            Back to Categories
          </Link>
        </div>
      </div>
    </div>
  );
}
