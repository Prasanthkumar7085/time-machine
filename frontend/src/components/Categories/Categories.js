import classNames from "classnames";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Co2Category from "../../assets/images/Co2Category.svg";
import InfantCategory from "../../assets/images/InfantCategory.svg";
import NonStateCategory from "../../assets/images/NonStateCategory.svg";
import PovertyCategory from "../../assets/images/PovertyCategory.svg";
import { getGames } from "../../redux/game/gameActions";
import { updateSelectedGame } from "../../redux/game/gameReducer";

export default function Categories() {
  const figStyle =
    "relative w-full transition-all duration-300 cursor-pointer group cursor-pointer indicator h-[50%]";
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
    <div className="flex flex-col justify-center items-center gap-10 w full h-[calc(100%-5rem)]">
      <div className="flex justify-center mt-8">
        <p className="text-white text-center font-menlo text-xl font-bold leading-[22.5px] word-spacing-1 tracking-wider">
          Select your time travel topic
        </p>
      </div>

      <div className="grid grid-cols-4 w-[95%]  overflow-hidden border-2 place-items-center border-stone-400">
        <div
          className="card w-full h-full bg-[#0d0d0d] shadow-xl border-2 rounded-none border-stone-400 cursor-pointer"
          onClick={() => {
            selectType(gamesHistory["us-poverty"]);
          }}
        >
          <figure className={figStyle}>
            <div className="w-full overflow-hidden relative">
              <img
                className={classNames(
                  "group-hover:scale-110 transition duration-300 ease-in-out w-full h-full ",
                  getDisabledStyle(gamesHistory["us-poverty"]),
                )}
                src={PovertyCategory}
                alt="US Poverty"
              />
            </div>
          </figure>
          <div className="card-body mt-[30%] w-25">
            <h3 className="text-white font-menlo text-2xl font-normal leading-8 tracking-[.10em] lining-nums tabular-nums">
              US <br />
              Poverty
            </h3>
            <p className="font-menlo opacity-80 text-[#fff] text-[15px] tracking-[.10em]">
              {getIndicatorText(gamesHistory["us-poverty"])}
            </p>
          </div>
        </div>

        <div
          className="card w-full h-full bg-[#0d0d0d] shadow-xl border-2 rounded-none border-stone-400 cursor-pointer"
          onClick={() => {
            selectType(gamesHistory["non-state-conflict"]);
          }}
        >
          <figure className={figStyle}>
            <div className="w-full overflow-hidden relative">
              <img
                className={classNames(
                  "group-hover:scale-110 transition duration-300 ease-in-out w-full object-fill",
                  getDisabledStyle(gamesHistory["non-state-conflict"]),
                )}
                src={NonStateCategory}
                alt="Non-State Conflict"
              />
            </div>
          </figure>
          <div className="card-body mt-[30%] w-25">
            <h3 className="text-[#fff] font-menlo text-2xl font-normal leading-8 tracking-[.10em] lining-nums tabular-nums">
              Non-State <br /> Conflict
            </h3>
            <p className="font-menlo opacity-80 text-[#fff] text-[15px] tracking-[.10em]">
              {getIndicatorText(gamesHistory["non-state-conflict"])}
            </p>
          </div>
        </div>

        <div
          className="card w-full h-full bg-[#0d0d0d] shadow-xl border-2 rounded-none border-stone-400 cursor-pointer"
          onClick={() => {
            selectType(gamesHistory["co2-concentrations"]);
          }}
        >
          <figure className={figStyle}>
            <div className="w-full overflow-hidden relative ">
              <img
                className={classNames(
                  "group-hover:scale-110 transition duration-300 ease-in-out w-full object-fill",
                  getDisabledStyle(gamesHistory["co2-concentrations"]),
                )}
                src={Co2Category}
                alt="CO2 Concentrations"
              />
            </div>
          </figure>
          <div className="card-body mt-[30%] w-25">
            <h3 className="text-white font-menlo text-2xl font-normal leading-8 tracking-[.10em] lining-nums tabular-nums">
              CO2 <br />
              Concentrations
            </h3>
            <p className="font-menlo opacity-80 text-[#fff] text-[15px] tracking-[.10em]">
              {getIndicatorText(gamesHistory["co2-concentrations"])}
            </p>
          </div>
        </div>

        <div
          className="card w-full h-full bg-[#0d0d0d] shadow-xl border-2 rounded-none border-stone-400 cursor-pointer"
          onClick={() => {
            selectType(gamesHistory["infant-mortality-rate"]);
          }}
        >
          <figure className={figStyle}>
            <div className="w-full overflow-hidden relative">
              <img
                className={classNames(
                  "group-hover:scale-110 transition duration-300 ease-in-out w-full object-fill",
                  getDisabledStyle(gamesHistory["infant-mortality-rate"]),
                )}
                src={InfantCategory}
                alt="Infant Mortality Rate"
              />
            </div>
          </figure>
          <div className="card-body mt-[30%] w-25">
            <h3 className="text-white font-menlo text-2xl font-normal leading-8 tracking-[.10em] lining-nums tabular-nums	">
              Infant <br />
              Mortality Rate
            </h3>
            <p className="font-menlo opacity-80 text-[#fff] text-[15px] tracking-[.10em]">
              {getIndicatorText(gamesHistory["infant-mortality-rate"])}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
