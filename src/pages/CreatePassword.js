import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LayoutGrad from "../ui/LayoutGrad";
import ModelLayout from "../ui/ModelLayout";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import LoadingButton from "../ui/LoadingButton";
import { toast } from "react-toastify";
import { updatePassword } from "../store/thunk/authThunk";
import { logout } from "../store/auth-slice";

const CreatePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cfPasswordVisible, setCfPasswordVisible] = useState(false);

  const submitHandler = async (data) => {
    console.log("data: ", data);
    try {
      await dispatch(
        updatePassword({
          token: queryParams.get("token"),
          newPassword: data.password,
        })
      ).unwrap();
      toast.success("Password Reset Successfull");
      await dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log("Error in updating password", error);
      toast.error("Something went wrong: " + error);
    }
  };
  return (
    <>
      <LayoutGrad>
        <ModelLayout>
          <div className="container">
            <div className="container image-container text-center">
              <div className="image-box w-[60px] h-[60px] mx-auto">
                <img
                  src="/music-512-removebg-preview.png"
                  className="w-[100%] h-[100%]"
                  alt="logo"
                />
              </div>
              <div className="text-3xl font-extrabold title-box">
                Create Password
              </div>

              <hr className="w-[80%] mx-auto my-[37px]" />

              <div className="container">
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="flex flex-col w-[50%] mx-auto">
                    <div className="flex flex-col items-start m-2 w-full relative">
                      <label htmlFor="password">Password*</label>
                      <input
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        {...register("password", {
                          required: true,
                          minLength: 6,
                          pattern:
                            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/,
                        })}
                        placeholder="Enter Password"
                        className="w-full p-2 rounded-md  text-black"
                      />
                      <span
                        className="text-red absolute top-[50%] text-xl right-0 px-2 text-black cursor-pointer"
                        onClick={() => setPasswordVisible((prev) => !prev)}
                      >
                        {passwordVisible && <IoEyeOutline />}
                        {!passwordVisible && <IoEyeOffOutline />}
                      </span>
                      {errors.password && (
                        <div>
                          {errors.password.type === "required" && (
                            <span className="text-err text-sm">
                              Password is required.
                            </span>
                          )}
                          {errors.password.type === "minLength" && (
                            <span className="text-err text-sm">
                              Password should be minimum 6 characters long.
                            </span>
                          )}
                          {errors.password.type === "pattern" && (
                            <span className="text-err text-sm">
                              <ul>
                                <li>At least one uppercase letter ([A-Z])</li>
                                <li>At least one lowercase letter ([a-z])</li>
                                <li>At least one digit ([0-9])</li>
                                <li>
                                  At least one special character ([@$!%*?&#])
                                </li>
                                <li>Minimum length of 6 characters</li>
                              </ul>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-start m-2 w-full relative">
                      <label htmlFor="cfpassword">Confirm Password*</label>
                      <input
                        type={cfPasswordVisible ? "text" : "password"}
                        id="cfpassword"
                        name="confirmPassword"
                        {...register("confirmPassword", {
                          required: "Confirm Password is required",
                          validate: (value) =>
                            value === watch("password") ||
                            "Passwords do not match",
                        })}
                        placeholder="Confirm Password"
                        className="w-full p-2 rounded-md text-black"
                      />
                      <span
                        className="text-red absolute top-[50%] text-xl right-0 px-2 text-black cursor-pointer"
                        onClick={() => setCfPasswordVisible((prev) => !prev)}
                      >
                        {cfPasswordVisible && <IoEyeOutline />}
                        {!cfPasswordVisible && <IoEyeOffOutline />}
                      </span>
                      {errors.confirmPassword && (
                        <span className="text-err text-sm">
                          {errors.confirmPassword.message}
                        </span>
                      )}
                    </div>

                    <button
                      disabled={isSubmitting ? true : false}
                      className="bg-galvin-green w-full p-2 m-2 text-black font-extrabold border-0 border-white border-solid rounded-full"
                      type="submit"
                    >
                      {status === "loading" ? <LoadingButton /> : "Continue"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ModelLayout>
      </LayoutGrad>
    </>
  );
};

export default CreatePassword;
