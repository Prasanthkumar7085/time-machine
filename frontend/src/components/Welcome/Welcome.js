import React, { useEffect } from "react";
import Background from "../Spaceship/Background";
import Spaceship from "../Spaceship/Spaceship";
import Text from "../Spaceship/Text";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

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
    <div className="h-full">
      <Spaceship
        number={counterState}
        setRunCounter={setRunCounter}
        scientistName={location?.state?.scientistName}
      />
    </div>
  );
}
