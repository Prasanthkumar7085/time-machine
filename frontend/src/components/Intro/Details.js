import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tutorial from "../../assets/tutorial.mp4";
import { startGame } from "../../redux/game/gameActions";

export default function Details({ scientistName, gameId, selectedType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initiateGame = () => {
    dispatch(startGame({ scientistName, gameId, selectedType })).then(() => {
      navigate("/question");
    });
  };
  return (
    <div className="absolute top-[4rem] left-0 w-full h-auto flex justify-center items-center flex-col gap-3 p-10">
      <div className="mockup-window border border-base-300">
        <div className="pl-3 mb-1 w-full">
          <h2 className="text-2xl font-bold">Instructions:</h2>
          <p className="text-gray-400 mt-1">
            If it's your first time, please watch the instructions.{" "}
            <span className="text-gray-200 font-semibold">
              Please turn up your volume to listen to the upcoming audio
              instructions.
            </span>
          </p>
          <p className="text-gray-400 mt-1">
            If you've seen them before, click the 'READY' button to proceed.
          </p>
        </div>
        <div className="w-full p-3 relative max-w-[1300px]">
          <ReactPlayer url={Tutorial} controls width="100%" height="100%" />
        </div>
      </div>
      <button className="btn btn-primary" onClick={initiateGame}>
        Ready!
      </button>
    </div>
  );
}
