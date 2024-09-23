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
    <div className="flex flex-col w-full h-[calc(100%-16rem)] justify-center items-center gap-16">
      <div className="flex flex-col gap-3 w-[800px] justify-center items-center">
        <div className="text-center text-white md:text-[15px] xl:text-[17px] xxl:text-[20px] font-bold font-primary">
          What is your scientist name?
        </div>
        <div className="w-[600px] opacity-70 text-center text-white md:text-[11px] xl:text-[13px] xxl:text-[15px] font-normal font-primary leading-[22px] ]">
          This can be anything you want, e.g., Dr. Van Nostrand, Dr. Spaceman
        </div>
      </div>
      <div className="flex flex-col gap-32 justify-center items-center">
        <input
          type="text"
          className="bg-transparent outline-none text-white    placeholder-center text-center font-primary md:text-[20px] xl:text-[22px] xxl:text-[25px]"
          autoFocus
          value={scientistName}
          placeholder="Enter name"
          onChange={(e) => {
            setScientistName(e.target.value);
          }}
        />

        <button
          className="btn rounded bg-[#3b46de] hover:bg-[#3b46de] font-secondary md:text-[16px] xl:text-[18px] xxl:text-[22px] text-white  disabled:bg-[#1e2042] disabled:text-[#565953]  w-[150px] h-[50px]"
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
