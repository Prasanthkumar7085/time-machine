import TerminalController from "./Terminal";
import LineChart from "./Chart";
import data from "../../assets/data.json";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createGame } from "../../redux/game/gameActions";
import { GAME_STARTING_YEAR, GAME_STEPS } from "../../utils/constants";

export default function Question() {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  const gameType = game.type;
  const gameData = data[gameType];
  const gameIndex = gameData?.findIndex(
    (item) =>
      item.date ===
      String(
        GAME_STARTING_YEAR[gameType] +
          game.answers.length * GAME_STEPS[gameType]
      )
  );
  const dataToShow = gameData?.slice(0, gameIndex);

  useEffect(() => {
    if (!game.type) {
      console.log("game not found");
      dispatch(createGame({ scientistName: "asqar" }));
    }
  }, []);

  return (
    <div className="flex w-full h-[calc(100%-4rem)] p-10">
      <div className="h-full w-full flex relative shadow-md rounded-md overflow-hidden">
        <div className="h-full w-[34%]">
          <TerminalController />
        </div>
        <div className="w-[66%] h-full absolute top-0 right-0 flex items-center justify-center bg-[#252a33]">
          <div className="w-[800px] h-[400px]">
            {dataToShow && (
              <LineChart data_type="impressions" Data={dataToShow} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
