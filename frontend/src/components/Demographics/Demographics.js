export default function Demographics() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-row gap-5">
        <div className="flex flex-col gap-3 justify-center items-start">
          <div className="form-control">
            <label className="flex flex-col">
              <span className="w-[250px] justify-end">Name</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-md"
              />
            </label>
          </div>

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
              <span className="w-[250px] justify-end">Age</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-md"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="flex flex-col">
              <span className="w-[250px] justify-end">Gender</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-md"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="flex flex-col">
              <span className="w-[250px] justify-end">Introduction</span>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Bio"
              ></textarea>
            </label>
          </div>
          <button className="btn btn-primary">Login</button>
        </div>
      </div>
    </div>
  );
}
