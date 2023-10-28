import Poverty from "../../assets/images/poverty.png";
import Conflict from "../../assets/images/nonstate.png";
import Infant from "../../assets/images/infant.png";
import CO2 from "../../assets/images/co2.png";
import classNames from "classnames";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../../redux/game/gameActions";
import { updateSelectedGame } from "../../redux/game/gameReducer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const figStyle =
    "relative w-full transition-all duration-300 cursor-pointer group cursor-pointer indicator";
  const dispatch = useDispatch();
  const gamesHistory = useSelector((state) => state.game.gamesHistory);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getGames());
  }, []);

  const getIndicatorStyle = (game) => {
    if (!game) {
      return "badge-warning";
    }
    const { finished, started } = game;
    if (finished) {
      return "badge-accent";
    }
    if (started) {
      return "badge-primary";
    }
    return "badge-warning";
  };

  const getIndicatorText = (game) => {
    if (!game) {
      return "badge-warning";
    }
    const { finished, started } = game;
    if (finished) {
      return "Finished";
    }
    if (started) {
      return "Not Completed";
    }
    return "Not Started";
  };

  const getDisabledStyle = (game) => {
    if (!game) {
      return "";
    }
    const { finished } = game;
    if (finished) {
      return "filter grayscale cursor-not-allowed";
    }
    return "";
  };

  const selectType = (game) => {
    if (!game) {
      return;
    }
    const { finished, id, type } = game;
    if (finished) {
      toast.error("You have already finished this topic!");
    } else {
      dispatch(updateSelectedGame({ selectedGameId: id, selectedType: type }));
      navigate("/welcome");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100%-4rem)]">
      <div className="mb-5 w-[500px]">
        <h2 className="text-2xl font-bold">Select the your travel topic:</h2>
        <p className="text-gray-400 mt-1">
          The items in grayscale indicate that you have already finished the
          topic. Items with an indicator mean you've started them but haven't
          finished yet.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8 w-[500px] h-[500px]">
        <figure
          className={figStyle}
          onClick={() => {
            selectType(gamesHistory["us-poverty"]);
          }}
        >
          <span
            className={classNames(
              "indicator-item indicator-center indicator-middle badge",
              getIndicatorStyle(gamesHistory["us-poverty"])
            )}
          >
            {getIndicatorText(gamesHistory["us-poverty"])}
          </span>
          <div className="w-full overflow-hidden relative rounded-lg">
            <img
              className={classNames(
                "group-hover:scale-110 transition duration-300 ease-in-out",
                getDisabledStyle(gamesHistory["us-poverty"])
              )}
              src={Poverty}
              alt="US Poverty"
            />
          </div>

          <figcaption className="absolute px-4 text-lg text-white bg-[#191D24] rounded-md left-2 bottom-2">
            <p>US Poverty</p>
          </figcaption>
        </figure>
        <figure
          className={figStyle}
          onClick={() => {
            selectType(gamesHistory["non-state-conflict"]);
          }}
        >
          <span
            className={classNames(
              "indicator-item indicator-center indicator-middle badge",
              getIndicatorStyle(gamesHistory["non-state-conflict"])
            )}
          >
            {getIndicatorText(gamesHistory["non-state-conflict"])}
          </span>
          <div className="w-full overflow-hidden relative rounded-lg">
            <img
              className={classNames(
                "group-hover:scale-110 transition duration-300 ease-in-out",
                getDisabledStyle(gamesHistory["non-state-conflict"])
              )}
              src={Conflict}
              alt="Non-State Conflict"
            />
          </div>

          <figcaption className="absolute px-4 text-lg text-white bg-[#191D24] rounded-md left-2 bottom-2">
            <p>Non-State Conflict</p>
          </figcaption>
        </figure>
        <figure
          className={figStyle}
          onClick={() => {
            selectType(gamesHistory["co2-concentrations"]);
          }}
        >
          <span
            className={classNames(
              "indicator-item indicator-center indicator-middle badge",
              getIndicatorStyle(gamesHistory["co2-concentrations"])
            )}
          >
            {getIndicatorText(gamesHistory["co2-concentrations"])}
          </span>
          <div className="w-full overflow-hidden relative rounded-lg">
            <img
              className={classNames(
                "group-hover:scale-110 transition duration-300 ease-in-out",
                getDisabledStyle(gamesHistory["co2-concentrations"])
              )}
              src={CO2}
              alt="CO2 Concentrations"
            />
          </div>

          <figcaption className="absolute px-4 text-lg text-white bg-[#191D24] rounded-md left-2 bottom-2">
            <p>CO2 Concentrations</p>
          </figcaption>
        </figure>
        <figure
          className={figStyle}
          onClick={() => {
            selectType(gamesHistory["infant-mortality-rate"]);
          }}
        >
          <span
            className={classNames(
              "indicator-item indicator-center indicator-middle badge",
              getIndicatorStyle(gamesHistory["infant-mortality-rate"])
            )}
          >
            {getIndicatorText(gamesHistory["infant-mortality-rate"])}
          </span>
          <div className="w-full overflow-hidden relative rounded-lg">
            <img
              className={classNames(
                "group-hover:scale-110 transition duration-300 ease-in-out",
                getDisabledStyle(gamesHistory["infant-mortality-rate"])
              )}
              src={Infant}
              alt="Infant Mortality Rate"
            />
          </div>

          <figcaption className="absolute px-4 text-lg text-white bg-[#191D24] rounded-md left-2 bottom-2">
            <p>Infant Mortality Rate</p>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
