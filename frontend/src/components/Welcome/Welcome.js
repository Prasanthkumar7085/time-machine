import React from "react";
import Background from "../Spaceship/Background";
import Spaceship from "../Spaceship/Spaceship";
import Text from "../Spaceship/Text";

let timer;
const easeInOutCubic = (t) => {
  return t / 100;
};

export default function Welcome() {
  const [counterState, setCounter] = React.useState(0.4);
  const [runCounter, setRunCounter] = React.useState(false);
  React.useEffect(() => {
    if (!runCounter) return;
    clearInterval(timer);
    timer = setInterval(() => {
      if (counterState >= 100) {
        clearInterval(timer);
        return;
      }
      setCounter((prev) => prev + easeInOutCubic(prev));
    }, 10);

    return () => clearInterval(timer);
  }, [counterState, runCounter]);

  return (
    <>
      {/* <Background /> */}
      <Text number={counterState} />
      <Spaceship number={counterState} setRunCounter={setRunCounter} />
    </>
  );
}
