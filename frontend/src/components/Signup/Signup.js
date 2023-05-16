import SpaceShip from "../../assets/images/SpaceShip.png";

export default function Signup() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-row gap-5">
        <div>
          <div className="mockup-code h-full w-[250px] shadow-lg">
            <pre data-prefix=">" className="text-warning">
              <code>installing...</code>
            </pre>
            <pre data-prefix=">" className="text-success">
              <code>Done!</code>
            </pre>
            <pre data-prefix="$">
              <code>Time Machine ON!</code>
            </pre>
            <pre data-prefix="$">
              <code>For registration</code>
            </pre>
            <pre data-prefix="">
              <code>fill the form ...</code>
            </pre>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center items-start">
          {/* <h2 className="text-3xl">Join Time Machine!</h2> */}
          <div className="form-control">
            <label className="flex flex-col">
              <span className="w-[250px] justify-end">Email</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-md"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="flex flex-col">
              <span className="w-[250px] justify-end">Password</span>
              <input
                type="password"
                placeholder="Type here"
                className="input input-bordered input-md"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="flex flex-col">
              <span className="w-[250px] justify-end">Repeat Password</span>
              <input
                type="password"
                placeholder="Type here"
                className="input input-bordered input-md"
              />
            </label>
          </div>
          <button className="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  );
}
