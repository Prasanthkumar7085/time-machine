import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/user/userActions";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PasswordChecklist from "./PasswordChecklist";

export default function Signup() {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();
  // const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const submitForm = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Password mismatch!");
      return;
    }
    data.email = data.email.toLowerCase();
    dispatch(registerUser(data)).then((res) => {
      if (!res.error) {
        navigate("/disclaimer");
      }
    });
  };

  const { password, confirmPassword } = watch();
  const letter = password ? password.match(/[a-zA-Z]/) : false;
  const number = password ? password.match(/\d/) : false;
  const moreThanEight = password ? password.length >= 8 : 0;
  const passwordMatch = moreThanEight && password === confirmPassword;

  return (
    <div className="flex w-full h-[calc(100%-4rem)] justify-center items-center">
      <div className="flex flex-row gap-5">
        <div className="flex flex-col gap-2">
          <div className="mockup-code h-full min-h-[180px] w-[250px] shadow-lg bg-[#191D24]">
            <pre data-prefix=">" className="text-warning">
              <code>Installing...</code>
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

          {/* {isPasswordFocused && (
            <> */}
          <h2 className="text-md font-semibold text-white mt-1">
            Password requirements:
          </h2>
          <PasswordChecklist
            letter={letter}
            number={number}
            moreThanEight={moreThanEight}
            passwordMatch={passwordMatch}
          />
          {/* </>
          )} */}
        </div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col gap-5 justify-center items-start">
            <div className="form-control">
              <label className="flex flex-col">
                <span className="w-[250px] justify-end mb-1">Email</span>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="input input-bordered input-md text-white"
                  {...register("email")}
                  required
                  // onFocus={() => setIsPasswordFocused(false)}
                />
              </label>
            </div>
            <div className="form-control relative">
              <label className="flex flex-col">
                <span className="w-[250px] justify-end mb-1">Password</span>
                <input
                  type="password"
                  placeholder="password123"
                  className="input input-bordered input-md text-white"
                  {...register("password")}
                  required
                  // onFocus={() => setIsPasswordFocused(true)}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="flex flex-col">
                <span className="w-[250px] justify-end mb-1">
                  Repeat Password
                </span>
                <input
                  type="password"
                  placeholder="password123"
                  className="input input-bordered input-md text-white"
                  {...register("confirmPassword")}
                  required
                  // onFocus={() => setIsPasswordFocused(true)}
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
          <div className="divider">Already have an account?</div>
          <Link to="/login">
            <p className="link link-hover text-slate-400 text-md w-full text-center">
              Login!
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
}
