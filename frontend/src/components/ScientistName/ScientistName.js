import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateScientistName } from "../../redux/user/userReducer";
import toast from "react-hot-toast";

export default function ScientistName() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [scientistName, setScientistName] = useState("second");

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        onSubmit();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = () => {
    if (!scientistName) {
      toast.error("Name must be filled!");
      return;
    }
    dispatch(updateScientistName({ scientistName }));
    navigate("/categories", { state: { scientistName } });
  };

  return (
    <div className="flex w-full h-[calc(100%-4rem)] justify-center items-center">
      <div className="flex flex-row gap-5 w-[500px]">
        <div className="mockup-code h-[300px] w-full shadow-lg bg-[#191D24]">
          <pre data-prefix=">">
            <code className="text-lg">What is your scientist name?</code>
          </pre>
          <pre data-prefix=">">
            <code className="text-lg">this can be anything you want,</code>
          </pre>
          <pre data-prefix=">">
            <code className="text-lg">
              e.g., Dr. Van Nostrand, Dr. Spaceman
            </code>
          </pre>
          <pre data-prefix=">">
            <code className="text-lg">
              Press <kbd className="kbd kbd-sm">⏎</kbd> to submit your name.
            </code>
          </pre>
          <pre data-prefix=">">
            <input
              type="text"
              class="bg-transparent outline-none text-warning text-lg"
              autofocus
              value={scientistName}
              onChange={(e) => setScientistName(e.target.value)}
            />
          </pre>
        </div>
      </div>
    </div>
  );
}
