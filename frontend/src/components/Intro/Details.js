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
    <div className="absolute top-[4rem] left-0 w-full h-auto flex justify-center items-center flex-col gap-3 ">
      <div className=" border border-base-300 flex flex-col w-full justify-center items-center">
        <div className="flex flex-col  justify-center items-center">
          <h2 className="text-[20px] font-bold font-menlo tracking-[.10rem]">
            Instructions:
          </h2>
          <p className="text-[#fff] mt-1 font-menlo tracking-[.10rem] opacity-70">
            If it's your first time, please watch the instructions. Please turn
            up your volume to listen to <br />
            the upcoming audio instructions. If you've seen them before, click
            the 'READY' button to proceed.
          </p>
        </div>
        <div className="w-full p-3 relative max-w-[70%]">
          <ReactPlayer url={Tutorial} controls width="100%" height="100%" />
        </div>
      </div>
      <button
        className="btn btn-primary w-36 bg-[#3B46DE] hover:bg-[#3B46DE]"
        onClick={initiateGame}
      >
        Ready!
      </button>
    </div>
  );
}
