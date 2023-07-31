import { useForm } from "react-hook-form";

export default function Demographics() {
  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    data.email = data.email.toLowerCase();
  };
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-row gap-5">
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col gap-3 justify-center items-start">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="flex flex-col">
                  <span className="w-[250px] justify-end">Age</span>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-md"
                    {...register("age")}
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
                    {...register("gender")}
                  />
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="flex flex-col">
                  <span className="w-[250px] justify-end">Sex</span>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-md"
                    {...register("sex")}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="flex flex-col">
                  <span className="w-[250px] justify-end">Ethnicity</span>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-md"
                    {...register("ethnicity")}
                  />
                </label>
              </div>
            </div>
            <div className="form-control">
              <label className="flex flex-col">
                <span className="w-[250px] justify-end">Country</span>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-md"
                  {...register("country")}
                />
              </label>
            </div>
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
