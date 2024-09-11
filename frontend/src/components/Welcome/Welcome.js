import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import StartGame from "../../assets/images/start-game-image.svg";

let timer;
const easeInOutCubic = (t) => {
  return t / 25;
};

export default function Welcome() {
  const [counterState, setCounter] = React.useState(0.4);
  const [runCounter, setRunCounter] = React.useState(false);
  const scientistName = useSelector((state) => state.user.scientistName);
  const navigate = useNavigate();
  const location = useLocation();

  const figStyle =
    "relative w-full transition-all duration-300 cursor-pointer group cursor-pointer indicator";

  useEffect(() => {
    if (!scientistName) {
      navigate("/scientist-name");
    }
  }, []);

  useEffect(() => {
    if (!runCounter) return;
    clearInterval(timer);
    timer = setInterval(() => {
      if (counterState >= 10) {
        clearInterval(timer);
        navigate("/intro");
        return;
      }
      setCounter((prev) => prev + easeInOutCubic(prev));
    }, 10);

    return () => clearInterval(timer);
  }, [counterState, runCounter]);

  return (
    <div className="flex flex-col justify-center items-center gap-10 w full h-[calc(100%-8rem)]">
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-white text-2xl font-sans tracking-[.10em] font-bold ">
          Welcome, Dr, {scientistName}.
        </h3>
        <h3 className="text-white text-2xl font-sans tracking-[.10em] font-bold ">
          Please step into the time machine
        </h3>
      </div>
      <figure className={figStyle}>
        <button
          class="btn indicator-item indicator-center indicator-middle w-[10%] rounded-lg mt-20 bg-[#1e1e1e]"
          onClick={() => {
            navigate("/intro");
          }}
        >
          Enter game
        </button>
        <div className="w-full overflow-hidden relative rounded-lg">
          <img src={StartGame} alt="US Poverty" className="w-full" />
        </div>
      </figure>
    </div>
  );
}
