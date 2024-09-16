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
    <div className="flex flex-col justify-center items-center gap-10 w full h-[calc(100%-6rem)]">
      <div>
        <p className="text-[20px] font-bold tracking-[.10em]">
          Select your time travel topic
        </p>
      </div>

      <div className="grid grid-cols-4  w-full border-2  h-full place-items-center border-stone-400">
        <div className="card w-full bg-[#0d0d0d] shadow-xl border-2 rounded-none h-full border-stone-400">
          <figure
            className={figStyle}
            onClick={() => {
              selectType(gamesHistory["us-poverty"]);
            }}
          >
            <div className="w-full overflow-hidden relative ">
              <img
                className={classNames(
                  "group-hover:scale-110 transition duration-300 ease-in-out w-full object-fill",
                  getDisabledStyle(gamesHistory["us-poverty"]),
                )}
                src={PovertyCategory}
                alt="US Poverty"
              />
            </div>
          </figure>
          <div className="card-body mt-24 w-25">
            <h3 className="text-white text-2xl font-sans tracking-[.10em] font-bold">
              US Poverty
            </h3>
            <p className="font-serif opacity-80 text-slate-400 tracking-[.20em]">
              {getIndicatorText(gamesHistory["us-poverty"])}
            </p>
          </div>
        </div>

        <div className="card w-full shadow-xl border-2 rounded-none	h-full border-stone-400">
          <figure
            className={figStyle}
            onClick={() => {
              selectType(gamesHistory["non-state-conflict"]);
            }}
          >
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
          <div className="card-body mt-24 w-25">
            <h3 className="text-white text-2xl font-sans tracking-[.10em] font-bold">
              Non-State Conflict
            </h3>
            <p className="font-serif opacity-80 text-slate-400 tracking-[.20em]">
              {getIndicatorText(gamesHistory["non-state-conflict"])}
            </p>
          </div>
        </div>

        <div className="card w-full shadow-xl border-2 rounded-none	h-full border-stone-400">
          <figure
            className={figStyle}
            onClick={() => {
              selectType(gamesHistory["co2-concentrations"]);
            }}
          >
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
          <div className="card-body mt-24 w-25">
            <h3 className="text-white text-2xl font-sans tracking-[.10em] font-bold">
              CO2 Concentrations
            </h3>
            <p className="font-serif opacity-80 text-slate-400 tracking-[.20em]">
              {getIndicatorText(gamesHistory["co2-concentrations"])}
            </p>
          </div>
        </div>

        <div className="card w-full  shadow-xl border-2 rounded-none	h-full border-stone-400">
          <figure
            className={figStyle}
            onClick={() => {
              selectType(gamesHistory["infant-mortality-rate"]);
            }}
          >
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
          <div className="card-body mt-24 w-25">
            <h3 className="text-white text-2xl font-sans tracking-[.10em] font-bold">
              Infant Mortality Rate
            </h3>
            <p className="font-serif opacity-80 text-slate-400 tracking-[.20em]">
              {getIndicatorText(gamesHistory["infant-mortality-rate"])}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
