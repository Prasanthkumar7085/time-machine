import React from "react";
import Background from "../Spaceship/Background";
import Spaceship from "../Spaceship/Spaceship";
import Text from "../Spaceship/Text";
import { useNavigate, useLocation } from "react-router-dom";

let timer;
const easeInOutCubic = (t) => {
  return t / 100;
};

export default function Welcome() {
  const [counterState, setCounter] = React.useState(0.4);
  const [runCounter, setRunCounter] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {
    if (!runCounter) return;
    clearInterval(timer);
    timer = setInterval(() => {
      if (counterState >= 10) {
        clearInterval(timer);
        navigate("/intro", {
          state: { scientistName: location?.state?.scientistName },
        });
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
