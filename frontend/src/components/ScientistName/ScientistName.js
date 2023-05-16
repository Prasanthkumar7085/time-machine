import { TypeAnimation } from "react-type-animation";

export default function ScientistName() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-row gap-5 w-[500px]">
        <div className="mockup-code h-full w-full shadow-lg">
          <pre data-prefix=">" className="text-warning">
            <TypeAnimation
              sequence={[
                "installing...", // Types 'One'
              ]}
              wrapper="code"
              cursor={true}
            />
          </pre>
          <pre data-prefix=">" className="text-success">
            <code>Done!</code>
          </pre>
          <pre data-prefix="$">
            <code>Time Machine ON!</code>
          </pre>
          <pre data-prefix="$">
            <code>What is your scientist name?</code>
          </pre>
          <pre data-prefix="">
            <code>this can be anything you want,</code>
          </pre>
          <pre data-prefix="">
            <code>e.g., Dr. Van Nostrand, Dr. Spaceman</code>
          </pre>
          <pre data-prefix="$">
            <input
              type="text"
              placeholder="Type here"
              className="input bg-transparent w-full max-w-xs focus:bg-transparent text-white p-0"
            />
          </pre>
        </div>
      </div>
    </div>
  );
}
