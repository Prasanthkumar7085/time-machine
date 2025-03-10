import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/user/userActions";
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
    <div className="flex w-full h-[calc(100%-5rem)] justify-center items-center">
      <div className="flex flex-row justify-center gap-[9.40rem]">
        <div className="flex flex-col gap-3 justify-center items-start p-5 w-[420px] h-[420px]">
          <h1 className="text-white text-[42px] font-bold font-primary  leading-[52px] not-italic	">
            Join the time
            <br />
            machine
          </h1>
          <div className="w-[400px] opacity-80 text-[#fff] text-[14px] font-normal font-primary leading-[20px] ">
            Enter as a scientist and play the game of predicting trends of human
            welfare to find out how accurate you are at predicting the future
          </div>
          <div className="divder my-4 border-t border-[#FFFFFF1A] w-full"></div>
          

          <h2 className="w-[296px] text-white text-[13px] font-bold font-primary leading-[15px] ">
            Password requirements:
          </h2>
          <PasswordChecklist
            letter={letter}
            number={number}
            moreThanEight={moreThanEight}
            passwordMatch={passwordMatch}
          />
        </div>

        <div className="flex flex-col gap-3 justify-center items-center">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-col gap-6 align-center p-5 w-[370px] h-[450px] shadow-lg bg-[#252525] rounded-lg">
              <div className="form-control">
                <label className="flex flex-col">
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="input input-bordered font-primary input-md text-white bg-[#3b3b3b]"
                    {...register("email")}
                    required
                    // onFocus={() => setIsPasswordFocused(false)}
                  />
                </label>
              </div>
              <div className="form-control relative">
                <label className="flex flex-col">
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="input input-bordered font-primary input-md text-white bg-[#3b3b3b]"
                    {...register("password")}
                    required
                    // onFocus={() => setIsPasswordFocused(true)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="flex flex-col">
                  <input
                    type="password"
                    placeholder="Repeat password"
                    className="input input-bordered font-primary input-md text-white bg-[#3b3b3b]"
                    {...register("confirmPassword")}
                    required
                    // onFocus={() => setIsPasswordFocused(true)}
                  />
                </label>
              </div>
              <button
                className="btn btn-primary  bg-[#3B46DE] font-secondary text-white hover:bg-[#3B46DE]"
                type="submit"
                disabled={loading}
              >
                Submit
              </button>
              <div className="divider m-0"></div>
              <div className="flex flex-col justify-center items-center">
                <div className="mb-4 font-secondary text-[13px]">Already have an account?</div>
                <button
                  className="btn bg-[#1baa66] text-white font-secondary w-[30%] hover:bg-[#1baa66]"
                  type="submit"
                  disabled={loading}
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
