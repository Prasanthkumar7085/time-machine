// RegisterScreen.js
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/user/userActions";

export default function Signup() {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    // check if passwords match
    if (data.password !== data.confirmPassword) {
      alert("Password mismatch");
    }
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
  };

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
            <pre data-prefix=">">
              <code>{error && error}</code>
            </pre>
          </div>
        </div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col gap-3 justify-center items-start">
            {/* <h2 className="text-3xl">Join Time Machine!</h2> */}
            <div className="form-control">
              <label className="flex flex-col">
                <span className="w-[250px] justify-end">Email</span>
                <input
                  type="email"
                  placeholder="Type here"
                  className="input input-bordered input-md"
                  {...register("email")}
                  required
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
                  {...register("password")}
                  required
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
                  {...register("confirmPassword")}
                  required
                />
              </label>
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
