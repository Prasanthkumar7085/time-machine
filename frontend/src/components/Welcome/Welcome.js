import React, { useEffect } from "react";
import Spaceship from "../Spaceship/Spaceship";
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
    <div className="h-[calc(100%-4rem)]">
      <Spaceship
        number={counterState}
        setRunCounter={setRunCounter}
        scientistName={scientistName}
      />
    </div>
  );
}
