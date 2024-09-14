import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import StartLogo from "../../assets/images/StartLogo.svg";

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
    <div className="flex flex-col justify-center items-center gap-10 w full ">
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
          class="btn w-[10%] rounded-full bg-[#1e1e1e] border-red-50 absolute top-1/2 left-[45%]"
          onClick={() => {
            navigate("/intro");
          }}
        >
          Enter game
        </button>
        <div className="w-full place-items-center ">
          <img
            src={StartLogo}
            alt="US Poverty"
            className="object-contain object-center w-full "
          />
        </div>
      </figure>
    </div>
  );
}
