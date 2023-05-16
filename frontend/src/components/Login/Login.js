import SpaceShip from "../../assets/images/SpaceShip.png";

export default function Login() {
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
              <code>To enter fill</code>
            </pre>
            <pre data-prefix="">
              <code>the form ...</code>
            </pre>
          </div>
        </div>
        {/* <div>
          <img
            src={SpaceShip}
            className="w-[500px] mask mask-squircle"
            alt="Spaceship"
          />
        </div> */}
        <div className="flex flex-col gap-3 justify-center items-start">
          {/* <h2 className="text-3xl">Login</h2> */}
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
          <button className="btn btn-primary">Login</button>
        </div>
      </div>
    </div>
  );
}
