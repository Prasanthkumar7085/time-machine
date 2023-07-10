import React, { useState } from "react";
import Terminal, {
  ColorMode,
  TerminalOutput,
  TerminalInput,
} from "react-terminal-ui";

const TerminalController = (props = {}) => {
  const [lineData, setLineData] = useState([
    <TerminalOutput>
      Welcome to 1980. Post-It Notes and the Rubik’s Cube have just hit the
      stores.
    </TerminalOutput>,
    <TerminalOutput>
      Your job as a scientist in 1980 is to predict future global CO2
      concentrations so humans can prepare for coming changes. Below, you can
      see historical data for global CO2 concentrations for the past 20 years in
      parts per million. Your task is to predict concentrations in 1985. After
      you make your prediction, we will time travel ahead to 1985 to see how
      accurate you were.
    </TerminalOutput>,
    <TerminalOutput>
      What will global CO2 concentrations be in 1985 (in parts per million)?
    </TerminalOutput>,
  ]);

  function onInput(input) {
    let ld = [...lineData];
    ld.push(<TerminalInput>{input}</TerminalInput>);
    if (input.toLocaleLowerCase().trim() === "view-source") {
      window.open("https://github.com/jonmbake/react-terminal-ui", "_blank");
    } else if (input.toLocaleLowerCase().trim() === "view-react-docs") {
      window.open("https://reactjs.org/docs/getting-started.html", "_blank");
    } else if (input.toLocaleLowerCase().trim() === "clear") {
      ld = [];
    } else if (input) {
      ld.push(<TerminalOutput>Unrecognized command</TerminalOutput>);
    }
    setLineData(ld);
  }

  return (
    <Terminal name="" colorMode={ColorMode.Dark} onInput={onInput}>
      {lineData}
    </Terminal>
  );
};

export default TerminalController;
