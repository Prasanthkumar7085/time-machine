import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Terminal({
  lines,
  hasEstimate,
  submitAnswer,
  notRounded,
  finished,
}) {
  const textareaRef = useRef(null);
  const [currentValue, setCurrentValue] = useState("> ");

  const textTypeClass = (type) => {
    switch (type) {
      case "info":
        return "text-info";
      case "error":
        return "text-error";
      case "text-bold":
        return "font-bold";
      default:
        return;
    }
  };

  const onKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        submitAnswer(currentValue);
      }
    },
    [currentValue],
  );

  const getTitle = (index) => {
    if (index == 0) {
      return "OBJECTIVE: ";
    } else if (index == 1) {
      return "YOUR JOB: ";
    } else if (index == 2) {
      return "YOUR TASK: ";
    } else if (index == 3) {
    } else if (index == 4) {
    }
  };

  useEffect(() => {
    if (textareaRef.current === null) return;
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [currentValue]);

  return (
    <div
      className={classNames(
        "mockup-code h-full w-full shadow-lg border-r border-r-[rgba(255,255,255,0.1)] overflow-auto pb-0 bg-[#191D24]",
        notRounded ? "rounded-none" : "",
      )}
    >
      {!finished &&
        lines.map((line, i) => {
          if (line.type === "list") {
            return (
              <div className="flex flex-col px-4 border-t border-t-[rgba(255,255,255,0.1)] py-2">
                {/* <code className="flex gap-2 flex-wrap my-2">
                  <p>~/bin/time</p>
                  <p className="text-warning">machine[1]</p>
                  <p className="text-primary">({line.time}s)</p>
                </code> */}
                <code
                  className={classNames(
                    "whitespace-normal flex-1 font-menlo word-spacing-2",
                    textTypeClass(line.type),
                  )}
                >
                  {line.value.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-row gap-2 font-menlo word-spacing-2"
                      >
                        <p>{">"} </p>
                        <p
                          className={classNames(
                            "whitespace-normal flex-1 font-menlo word-spacing-2",
                            textTypeClass("info"),
                          )}
                        >
                          {item}
                        </p>
                      </div>
                    );
                  })}
                </code>
              </div>
            );
          }
          return (
            <div className="flex flex-col px-4 border-t border-t-[rgba(255,255,255,0.1)] py-2">
              {/* <code className="flex gap-2 flex-wrap my-2">
                <p>~/bin/time</p>
                <p className="text-warning">machine[1]</p>
                <p className="text-primary">({line.time}s)</p>
              </code> */}
              <p className="w-[233px] text-white text-[16px] font-bold font-menlo">
                {getTitle(i)}
              </p>
              <code
                className={classNames(
                  "whitespace-normal flex-1 font-menlo word-spacing-2",
                  textTypeClass(line.type),
                )}
              >
                {line.value}
              </code>
            </div>
          );
        })}
      {hasEstimate && (
        <>
          <div className="flex mb-3 px-4 h-[42%]" onKeyUp={onKeyPress}>
            <textarea
              className="w-full h-full bg-transparent resize-none focus:outline-none font-mono"
              ref={textareaRef}
              value={currentValue}
              onChange={(e) => {
                if (e.target.value.length < 2) {
                  setCurrentValue("> ");
                  return;
                }
                setCurrentValue(e.target.value);
              }}
              autoFocus
            ></textarea>
          </div>
          <div className="flex justify-center sticky bottom-0 bg-[#191e24]">
            <button
              className="btn bg-[#3b46de] w-[90%] text-white hover:bg-[#3b46de]"
              onClick={() => {
                submitAnswer(currentValue);
                setCurrentValue("> ");
              }}
            >
              Let's see how you did!
            </button>
          </div>
        </>
      )}
    </div>
  );
}
