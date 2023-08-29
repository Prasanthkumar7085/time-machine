import TerminalController from "./Terminal";
import LineChart from "./Chart";
import data from "../../assets/data.json";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createGame } from "../../redux/game/gameActions";
import { GAME_STARTING_YEAR, GAME_STEPS } from "../../utils/constants";

export default function Question() {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  const gameType = game.type;
  const gameData = data[gameType];
  const estimateYear =
    GAME_STARTING_YEAR[gameType] + game.answers.length * GAME_STEPS[gameType];
  const gameIndex = gameData?.findIndex(
    (item) => item.date === String(estimateYear)
  );
  const dataToShow = gameData?.slice(0, gameIndex);

  const [chartData, setChartData] = useState([
    ...dataToShow,
    { date: String(estimateYear), value: null },
    { date: String(estimateYear + GAME_STEPS[gameType]), value: null },
  ]);

  const updateChartData = (value, estimateMargin) => {
    const newData = [...chartData];
    const updatedData = newData.map((item, index) => {
      if (index === newData.length - 2) {
        return { ...item, value, estimateMargin };
      }
      return item;
    });
    setChartData(updatedData);
  };

  return (
    <div className="flex w-full h-[calc(100%-4rem)] p-10">
      <div className="h-full w-full flex relative shadow-md rounded-md overflow-hidden">
        <div className="h-full w-[34%]">
          <TerminalController />
        </div>
        <div className="w-[66%] h-full absolute top-0 right-0 flex items-center justify-center bg-[#252a33]">
          <div className="w-[800px] h-[400px]">
            {chartData.length > 0 && (
              <LineChart
                data_type="impressions"
                Data={chartData}
                updateChartData={updateChartData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
