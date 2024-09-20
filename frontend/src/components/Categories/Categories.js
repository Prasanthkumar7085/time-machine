import classNames from "classnames";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Climate from "../../assets/images/Climate.webp";
import economy from "../../assets/images/economy.webp";
import PeaceWar from "../../assets/images/PeaceWar.webp";
import PublicHealth from "../../assets/images/PublicHealth.png";
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
    <div className="flex flex-col justify-start items-center gap-16 w full h-[calc(100%-5rem)]">
      <div className="flex justify-center mt-8">
        <p className="text-white text-center font-primary text-xl font-[700] leading-[22.5px] ">
          Select your time travel topic
        </p>
      </div>

      <div className="grid grid-cols-4 w-full  overflow-hidden border-y place-items-center border-[#FFFFFF1A]">
        <div
          className="card p-2 box-border w-full  h-full bg-[#0d0d0d] shadow-xl border-e rounded-none border-[#FFFFFF1A] cursor-pointer"
          onClick={() => {
            selectType(gamesHistory["us-poverty"]);
          }}
        >
          <figure className={figStyle}>
            <div className="w-full overflow-hidden relative h-full ">
              <img
                className={classNames(
                  "group-hover:scale-110 transition duration-300 ease-in-out w-full h-full ",
                  getDisabledStyle(gamesHistory["us-poverty"]),
                )}
                src={economy}
                alt="US Poverty"
              />
            </div>
          </figure>
          <div className="card-body mt-[30%] w-25">
            <h3 className="text-white font-primary md:text-[20px] xl:text-[22px] xxl:text-[26px] font-normal leading-8  lining-nums tabular-nums">
              US <br />
              Poverty
            </h3>
            <p className="font-primary opacity-80 text-[#fff] md:text-[9px] xl:text-[12px] xxl:text-[14px] ">
              {getIndicatorText(gamesHistory["us-poverty"])}
            </p>
          </div>
        </div>

        <div
          className="card p-2 box-border w-full h-full bg-[#0d0d0d] shadow-xl border-e rounded-none border-[#FFFFFF1A] cursor-pointer"
          onClick={() => {
            selectType(gamesHistory["non-state-conflict"]);
          }}
        >
          <figure className={figStyle}>
            <div className="w-full overflow-hidden relative h-full">
              <img
                className={classNames(
                  "group-hover:scale-110 transition duration-300 ease-in-out w-full object-fill h-full",
                  getDisabledStyle(gamesHistory["non-state-conflict"]),
                )}
                src={PeaceWar}
                alt="Non-State Conflict"
              />
            </div>
          </figure>
          <div className="card-body mt-[30%] w-25">
            <h3 className="text-[#fff] font-primary md:text-[20px] xl:text-[22px] xxl:text-[26px] font-normal leading-8  lining-nums tabular-nums">
              Non-State <br /> Conflict
            </h3>
            <p className="font-primary opacity-80 text-[#fff] md:text-[9px] xl:text-[12px] xxl:text-[14px] ">
              {getIndicatorText(gamesHistory["non-state-conflict"])}
            </p>
          </div>
        </div>

        <div
          className="card p-2 box-border w-full h-full bg-[#0d0d0d] shadow-xl border-e border-[#FFFFFF1A] rounded-none cursor-pointer"
          onClick={() => {
            selectType(gamesHistory["co2-concentrations"]);
          }}
        >
          <figure className={figStyle}>
            <div className="w-full overflow-hidden relative h-full">
              <img
                className={classNames(
                  "group-hover:scale-110 transition duration-300 ease-in-out w-full object-fill h-full",
                  getDisabledStyle(gamesHistory["co2-concentrations"]),
                )}
                src={Climate}
                alt="CO2 Concentrations"
              />
            </div>
          </figure>
          <div className="card-body mt-[30%] w-25">
            <h3 className="text-white font-primary md:text-[20px] xl:text-[22px] xxl:text-[26px] font-normal leading-8  lining-nums tabular-nums">
              CO2 <br />
              Concentrations
            </h3>
            <p className="font-primary opacity-80 text-[#fff] md:text-[9px] xl:text-[12px] xxl:text-[14px] ">
              {getIndicatorText(gamesHistory["co2-concentrations"])}
            </p>
          </div>
        </div>
 
        <div
          className="card p-2 box-border w-full h-full bg-[#0d0d0d] shadow-xl border-e border-[#FFFFFF1A] rounded-none  cursor-pointer"
          onClick={() => {
            selectType(gamesHistory["infant-mortality-rate"]);
          }}
        >
          <figure className={figStyle}>
            <div className="w-full overflow-hidden relative h-full">
              <img
                className={classNames(
                  "group-hover:scale-110 transition duration-300 ease-in-out w-full object-fill h-full",
                  getDisabledStyle(gamesHistory["infant-mortality-rate"]),
                )}
                src={PublicHealth}
                alt="Infant Mortality Rate"
              />
            </div>
          </figure>
          <div className="card-body mt-[30%] w-25">
            <h3 className="text-white font-primary font-normal leading-8  lining-nums tabular-nums md:text-[20px] xl:text-[22px] xxl:text-[26px]	">
              Infant <br />
              Mortality Rate
            </h3>
            <p className="font-primary opacity-80 text-[#fff] md:text-[9px] xl:text-[12px] xxl:text-[14px] ">
              {getIndicatorText(gamesHistory["infant-mortality-rate"])}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
