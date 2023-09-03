import React, { useRef, useEffect, useState, useCallback } from "react";
import classNames from "classnames";

export default function Terminal({
  lines,
  hasEstimate,
  submitAnswer,
  notRounded,
}) {
  const textareaRef = useRef(null);
  const [currentValue, setCurrentValue] = useState("> ");
  const [randomNumbers, setRandomNumbers] = useState([]);

  useEffect(() => {
    setRandomNumbers(
      lines.map(() => {
        var randomnum = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
        return randomnum;
      })
    );
  }, []);

  const textTypeClass = (type) => {
    switch (type) {
      case "info":
        return "text-info";
      case "error":
        return "text-error";
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
    [currentValue]
  );

  useEffect(() => {
    if (textareaRef.current === null) return;
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [currentValue]);

  return (
    <div
      className={classNames(
        "mockup-code h-full w-full shadow-lg border-r border-r-[rgba(255,255,255,0.1)] overflow-auto pb-0",
        notRounded ? "rounded-none" : ""
      )}
    >
      <div>
        {lines.map((line, i) => {
          if (line.type === "list") {
            return (
              <div className="flex mb-3 flex-col px-4 border-t border-t-[rgba(255,255,255,0.1)]">
                <code className="flex gap-2 flex-wrap my-2">
                  <p>~/bin/time</p>
                  <p className="text-warning">machine[1]</p>
                  <p className="text-primary">({randomNumbers[i]}s)</p>
                </code>
                <code
                  className={classNames(
                    "whitespace-normal flex-1",
                    textTypeClass(line.type)
                  )}
                >
                  {line.value.map((item, index) => {
                    return (
                      <div key={index} className="flex flex-row gap-2">
                        <p>{">"} </p>
                        <p>{item}</p>
                      </div>
                    );
                  })}
                </code>
              </div>
            );
          }
          return (
            <div className="flex mb-3 flex-col px-4 border-t border-t-[rgba(255,255,255,0.1)]">
              <code className="flex gap-2 flex-wrap my-2">
                <p>~/bin/time</p>
                <p className="text-warning">machine[1]</p>
                <p className="text-primary">({randomNumbers[i]}s)</p>
              </code>
              <code
                className={classNames(
                  "whitespace-normal flex-1",
                  textTypeClass(line.type)
                )}
              >
                {line.value}
              </code>
            </div>
          );
        })}
        {hasEstimate && (
          <>
            <div className="flex mb-3 px-4 " onKeyUp={onKeyPress}>
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
              >
                {"> "}
              </textarea>
            </div>
            {/* <div className="flex mb-3 px-4">
              <code>{"> "}</code>
              <code
                className="whitespace-normal flex-1 text-justify underline cursor-pointer hover:text-primary ml-3"
                onClick={() => {
                  submitAnswer(currentValue);
                }}
              >
                Next question
              </code>
            </div> */}
            <button
              className="btn btn-primary sticky bottom-3 left-full mb-3 mr-3"
              onClick={() => {
                submitAnswer(currentValue);
              }}
            >
              Next question
            </button>
          </>
        )}
      </div>
    </div>
  );
}
