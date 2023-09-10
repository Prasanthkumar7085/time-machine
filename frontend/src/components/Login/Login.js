import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/user/userActions";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    data.email = data.email.toLowerCase();
    dispatch(loginUser(data)).then((res) => {
      if (!res.error) {
        navigate("/disclaimer");
      }
    });
  };
  return (
    <div className="flex w-full h-[calc(100%-4rem)] justify-center items-center">
      <div className="flex flex-row gap-5">
        <div>
          <div className="mockup-code h-full w-[250px] shadow-lg bg-[#252a33]">
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
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col gap-3 justify-center items-start">
            <div className="form-control">
              <label className="flex flex-col">
                <span className="w-[250px] justify-end">Email</span>
                <input
                  type="email"
                  placeholder="Type here"
                  className="input input-bordered input-md text-white"
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
                  className="input input-bordered input-md text-white"
                  {...register("password")}
                  required
                />
              </label>
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
