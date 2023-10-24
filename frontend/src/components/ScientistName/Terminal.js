import React, { useState } from "react";
import Terminal, {
  ColorMode,
  TerminalOutput,
  TerminalInput,
} from "react-terminal-ui";
import { useNavigate } from "react-router-dom";
import { updateScientistName } from "../../redux/user/userReducer";
import { useDispatch } from "react-redux";

const TerminalController = (props = {}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [lineData, setLineData] = useState([
    <TerminalOutput>What is your scientist name?</TerminalOutput>,
    <TerminalOutput>this can be anything you want,</TerminalOutput>,
    <TerminalOutput>e.g., Dr. Van Nostrand, Dr. Spaceman</TerminalOutput>,
  ]);

  function onInput(input) {
    let ld = [...lineData];
    ld.push(<TerminalInput>{input}</TerminalInput>);
    if (!input) {
      ld.push(<TerminalOutput>Name must be filled!</TerminalOutput>);
    }
    setLineData(ld);
    dispatch(updateScientistName({ scientistName: input }));
    navigate("/categories", { state: { scientistName: input } });
  }

  return (
    <Terminal
      name=""
      colorMode={ColorMode.Dark}
      onInput={onInput}
      height="250px"
    >
      {lineData}
    </Terminal>
  );
};

export default TerminalController;
