import React from "react";
import { useDispatch } from "react-redux";
import { createGame } from "../../redux/game/gameActions";

export default function Details({ scientistName }) {
  const dispatch = useDispatch();

  const initiateGame = () => {
    dispatch(createGame({ scientistName }));
  };
  return (
    <div className="absolute top-[4rem] left-0 w-full h-[calc(100%-4rem)] flex justify-center items-center flex-col gap-3">
      <div className="bg-[rgba(255,255,255,0.02)] rounded shadow-md w-[600px] h-[400px] backdrop-blur-sm">
        test
      </div>
      <button className="btn btn-primary" onClick={initiateGame}>
        Ready!
      </button>
    </div>
  );
}
