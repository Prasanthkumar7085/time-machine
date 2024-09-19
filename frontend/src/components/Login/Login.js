import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/user/userActions";

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
    <div className="flex w-full h-[calc(100%-7rem)] justify-center items-center ">
      <div className="flex flex-row justify-center gap-[9.40rem]">
        <div className="flex flex-col gap-3 justify-center items-start p-5 w-[420px] h-[420px]">
          <h1 className="text-white text-[42px] font-bold font-menlo word-spacing-1 leading-[52px] tracking-[.10rem] not-italic	">
            Join the time
            <br />
            machine
          </h1>
          <div className="w-[400px] opacity-80 text-[#fff] text-[14px] font-normal font-menlo leading-[20px] tracking-[.15em] word-spacing-2">
            Enter as a scientist and play the game of predicting trends of human
            welfare to find out how accurate you are at predicting the future
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-col gap-8 align-center p-5 w-[370px] h-[400px] shadow-lg bg-[#252525] rounded-lg">
              <div className="form-control">
                <label className="flex flex-col">
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="input input-bordered input-md text-white bg-[#3b3b3b]"
                    {...register("email")}
                    required
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="flex flex-col">
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="input input-bordered input-md text-white bg-[#3b3b3b]"
                    {...register("password")}
                    required
                  />
                </label>
              </div>

              <div className="flex flex-col gap-2 justify-center">
                <button
                  className="btn btn-primary bg-[#3B46DE] text-white font-[Inter] hover:bg-[#3B46DE]"
                  type="submit"
                  disabled={loading}
                >
                  Login
                </button>
              </div>
              <div className="divider mt-0"></div>
              <div className="flex justify-center items-center">
                <button
                  className="btn bg-[#1baa66] text-white w-[80%] hover:bg-[#1baa66]"
                  type="submit"
                  disabled={loading}
                  onClick={() => navigate("/signup")}
                >
                  Create a new account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
