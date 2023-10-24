import React, { useRef, useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { createGame, startGame } from "../../redux/game/gameActions";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import Tutorial from "../../assets/tutorial.mp4";
import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";
import { MediaOutlet, MediaPlayer, MediaGesture } from "@vidstack/react";
import MediaAutoPlay from "./MediaAutoPlay";

const introText = [
  "You are on your way to the past. While you are traveling, please read the instructions for your task below.",
  5000,
  "When you arrive, you will see a graph showing a time trend for an important outcome for the future of humanity. Your job will be to estimate the value for the next time point.",
  5000,
  "First, you will click on the graph to indicate your best guess for the future, then you will drag your cursor up or down to create your 'Estimate Zone,' which will be scored for accuracy.",
  5000,
  "If your Estimate Zone does not include the correct value, you will receive 0 points. However, larger Estimate Zones will receive fewer points than smaller, more precise ones. So, to receive the most points, you want your Estimate Zone to be as small as possible, while still including the correct value.",
  5000,

  "We're nearing our destination now. Click ready to exit the time machine.",
  5000,
];

export default function Details({ scientistName, gameId, selectedType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [play, setPlay] = useState(false);
  const [showReadyButton, setShowReadyButton] = useState(false);

  useEffect(() => {
    const delayedFunctionForPlay = () => {
      setPlay(true);
    };

    const delayedFunctionForReady = () => {
      setShowReadyButton(true);
    };

    const timeoutIdPlay = setTimeout(delayedFunctionForPlay, 12000);
    const timeoutIdReady = setTimeout(delayedFunctionForReady, 50000);

    return () => {
      clearTimeout(timeoutIdPlay);
      clearTimeout(timeoutIdReady);
    };
  }, []);

  useEffect(() => {
    const delayedFunction = () => {
      setPlay(true);
    };

    const timeoutId = setTimeout(delayedFunction, 12000);

    return () => clearTimeout(timeoutId);
  }, []);

  const initiateGame = () => {
    dispatch(startGame({ scientistName, gameId, selectedType })).then(() => {
      navigate("/question");
    });
  };
  return (
    <div className="absolute top-[4rem] left-0 w-full h-[calc(100%-4rem)] flex justify-center items-center flex-col gap-3 p-10">
      <div className="mockup-window border border-base-300">
        <div className="pl-3 mb-1 w-full">
          <h2 className="text-2xl font-bold">Instructions:</h2>
          <p className="text-gray-400 mt-1">
            If it's your first time, please watch the instructions. If you've
            seen them before, click the 'READY' button to proceed.
          </p>
        </div>
        <div className="w-full p-3 relative max-w-[1300px]">
          <MediaPlayer src={Tutorial} className="max-w-[1300px]" muted controls>
            <MediaOutlet>
              <MediaGesture
                className="top-0 left-0 h-full w-full"
                event="pointerup"
                action="toggle:paused"
              />
              <MediaGesture
                className="top-0 left-0 h-full w-full"
                event="dblpointerup"
                action="toggle:fullscreen"
              />
              <MediaGesture
                className="top-0 left-0 z-10 h-full w-1/5"
                event="dblpointerup"
                action="seek:-10"
              />
              <MediaGesture
                className="top-0 right-0 z-10 h-full w-1/5"
                event="dblpointerup"
                action="seek:10"
              />
            </MediaOutlet>
          </MediaPlayer>
          {/* <div className="absolute top-[70px] right-[70px] w-[750px] h-fit border border-base-300 p-3 rounded-xl">
            <TypeAnimation
              sequence={introText}
              speed={50}
              omitDeletionAnimation={true}
              cursor={true}
              className="font-mono"
            />
          </div> */}
        </div>
      </div>
      {/* {true && ( */}
      <button className="btn btn-primary" onClick={initiateGame}>
        Ready!
      </button>
      {/* )} */}
    </div>
  );
}
