import { NavLink, useNavigate } from "react-router-dom";
import LayoutGrad from "../ui/LayoutGrad";
import ModelLayout from "../ui/ModelLayout";
import SocialButton from "../ui/SocialButton";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useState } from "react";
import LoadingButton from "../ui/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login as loginThunk } from "../store/thunk/authThunk";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../store/thunk/authThunk";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { status, user, token } = useSelector((state) => state.auth);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      console.log(data);
      await dispatch(loginThunk(data)).unwrap();
      console.log("Login successfull", status, user, token);
      toast.success("Login Successfull");
      navigate("/");
    } catch (error) {
      // If there's an error, show a toast notification with the error message
      console.log("Something went wrong while logging in.", error);
      toast.error("Something went wrong: " + error);
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      // Send the response token to the backend to verify and get the user data
      await dispatch(loginWithGoogle(response)).unwrap();
      console.log("Google login successfull!");
      toast.success("Login Successfull");
      navigate("/");
    } catch (error) {
      toast.error("Oops Something went wrong: " + error);
      console.error("Google login failed: ", error);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login error: ", error);
    toast.error("Oops Something went wrong: " + error);
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
                Login to Galvin
              </div>
              <div className="container mt-4 mx-auto">
                <div className="w-[60%] mx-auto">
                  <SocialButton
                    type="button"
                    socialType="google"
                    name="Continue with Google"
                    onLoginSuccess={handleGoogleLoginSuccess}
                    onLoginFailure={handleGoogleLoginFailure}
                  />
                  <SocialButton
                    type="button"
                    socialType="facebook"
                    name="Continue with Facebook"
                  />
                </div>
              </div>

              <hr className="w-[80%] mx-auto my-[37px]" />

              <div className="container">
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="flex flex-col w-[50%] mx-auto">
                    <div className="flex flex-col items-start m-2 w-full">
                      <label htmlFor="email">Email or Username*</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        {...register("email", { required: true })}
                        placeholder="Enter Email"
                        className="w-full p-2 rounded-md  text-black"
                      />
                      {errors.email && (
                        <span className="text-err text-sm">
                          Email is required.
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-start m-2 w-full relative">
                      <label htmlFor="password">Password*</label>
                      <input
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        {...register("password", { required: true })}
                        placeholder="Enter Password"
                        className="w-full p-2 rounded-md  text-black"
                      />
                      {errors.password && (
                        <span className="text-err text-sm">
                          Password is required.
                        </span>
                      )}
                      <span
                        className="text-red absolute top-[50%] text-xl right-0 px-2 text-black cursor-pointer"
                        onClick={() => setPasswordVisible((prev) => !prev)}
                      >
                        {passwordVisible && <IoEyeOutline />}
                        {!passwordVisible && <IoEyeOffOutline />}
                      </span>
                    </div>

                    <button
                      disabled={isSubmitting ? true : false}
                      className="bg-galvin-green w-full p-2 m-2 text-black font-extrabold border-0 border-white border-solid rounded-full"
                      type="submit"
                    >
                      {status === "loading" ? <LoadingButton /> : "Login"}
                    </button>
                    <div className="text-right underline">
                      <NavLink
                        to={"/forget-password"}
                        className="hover:text-galvin-green"
                      >
                        Forgot Password?
                      </NavLink>
                    </div>
                    <div className="text-[#575656] m-7">
                      Don't have account ? &nbsp;
                      <NavLink
                        to={"/signup"}
                        className="text-white hover:text-galvin-green underline"
                      >
                        Signup for Galvin music
                      </NavLink>
                    </div>
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

export default Login;
