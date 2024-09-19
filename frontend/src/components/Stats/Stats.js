import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Climate from "../../assets/images/Climate.webp";
import economy from "../../assets/images/economy.webp";
import PeaceWar from "../../assets/images/PeaceWar.webp";
import PublicHealth from "../../assets/images/PublicHealth.png";
import { getGames } from "../../redux/game/gameActions";
import { InfoIcon } from "../Question";

export default function Stats() {
  const game = useSelector((state) => state.game);
  const { id } = useSelector((state) => state.user);
  const gamesHistory = game.gamesHistory;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
  }, []);

  const getGameImage = (gameType) => {
    switch (gameType) {
      case "co2-concentrations":
        return Climate;
      case "infant-mortality-rate":
        return PublicHealth;
      case "non-state-conflict":
        return PeaceWar;
      case "us-poverty":
        return economy;
      default:
        return Climate;
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

  const games = Object.keys(gamesHistory);

  return (
    <div className="hero h-[calc(100%-4rem)]">
      <div className="hero-content text-center">
        <div className="max-w-4xl">
          {games.map((el) => {
            const game = gamesHistory[el];
            const gameType = game.type;
            const answers = game.answers;
            if (!answers) return null;

            const averagePredictiveAccuracy = (answers) => {
              const total = answers.reduce((acc, answer) => {
                return acc + answer.predictiveAccuracy;
              }, 0);
              if (answers.length === 0) {
                return 0;
              }
              return (total / answers.length).toFixed(1);
            };

            const averageConfidentBandAccuracy = (answers) => {
              const total = answers.reduce((acc, answer) => {
                return acc + answer.confidentBandAccuracy;
              }, 0);
              if (answers.length === 0) {
                return 0;
              }
              return (total / answers.length).toFixed(1);
            };

            const averagePercisionOfConfidentBand = (answers) => {
              const total = answers.reduce((acc, answer) => {
                return acc + answer.percisionOfConfidentBand;
              }, 0);
              if (answers.length === 0) {
                return 0;
              }
              return (total / answers.length).toFixed(1);
            };
            return (
              <div
                className="card card-side bg-base-100 shadow-xl mb-8 overflow-visible"
                key={gameType}
              >
                <figure className="w-[150px] h-[150px] flex-shrink-0 flex-grow relative">
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
                        {averagePredictiveAccuracy(answers)}
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
                        {averageConfidentBandAccuracy(answers)}
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
                        {averagePercisionOfConfidentBand(answers)}
                        <div className="ml-1 text-info text-2xl font-semibold">
                          /10
                        </div>
                      </div>

                      {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
        </div>
      </div>
    </div>
  );
}
