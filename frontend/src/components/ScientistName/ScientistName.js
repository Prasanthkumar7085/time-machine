import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateScientistName } from "../../redux/user/userReducer";

export default function ScientistName() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [scientistName, setScientistName] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scientistName]);

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (!scientistName) {
      toast.error("Name must be filled!");
      return;
    }

    dispatch(updateScientistName({ scientistName }));
    navigate("/categories", { state: { scientistName } });
  };

  return (
    <div className="flex flex-col w-full h-[calc(100%-16rem)] justify-center items-center gap-24">
      <div className="flex flex-col gap-5 w-[800px] justify-center items-center">
        <div className="text-center text-white text-[17px] font-bold font-menlo">
          What is your scientist name?
        </div>
        <div className="w-[600px] opacity-70 text-center text-white text-[14px] font-normal font-['Menlo'] leading-[14px] tracking-[.15em]">
          This can be anything you want, e.g., Dr. Van Nostrand, Dr. Spaceman
        </div>
      </div>
      <div className="flex flex-col gap-16 justify-center items-center">
        <input
          type="text"
          className="bg-transparent outline-none text-warning  text-xl placeholder-center text-center "
          autoFocus
          value={scientistName}
          placeholder="Enter name"
          onChange={(e) => {
            setScientistName(e.target.value);
          }}
        />

        <button
          className="btn bg-[#3b46de] hover:bg-[#3b46de] text-white  disabled:bg-[#1e2042] disabled:text-[#565953]  w-[150px] h-[50px]"
          type="submit"
          disabled={!scientistName}
          onClick={onSubmit}
          onKeyDown={keyDownHandler}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
