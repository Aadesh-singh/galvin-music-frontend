import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { register as authRegister } from "../services/AuthService";
import SocialButton from "../ui/SocialButton";
import LayoutGrad from "../ui/LayoutGrad";
import ModelLayout from "../ui/ModelLayout";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

import { useState } from "react";
import LoadingButton from "../ui/LoadingButton";
import { toast } from "react-toastify";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cfPasswordVisible, setCfPasswordVisible] = useState(false);

  const submitHandler = async (data) => {
    console.log(data);
    const res = await authRegister(data);
    if (res.success) {
      console.log("user registered successully.");
      navigate("/email-verify");
    } else {
      console.log("someting went wrong while registering user.", res.error);
      toast.error("Someting went wrong");
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
                Signup on Galvin Music
              </div>
              <div className="container mt-4 mx-auto">
                <div className="w-[60%] mx-auto">
                  <SocialButton
                    type="button"
                    socialType="google"
                    name="Continue with Google"
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
                      <label htmlFor="fName">First Name*</label>
                      <input
                        type="text"
                        id="fName"
                        name="firstName"
                        {...register("firstName", { required: true })}
                        placeholder="Enter First Name"
                        className="w-full p-2 rounded-md  text-black"
                      />
                      {errors.firstName && (
                        <span className="text-err text-sm">
                          First Name is required.
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-start m-2 w-full">
                      <label htmlFor="lName">Last Name*</label>
                      <input
                        type="text"
                        id="lName"
                        name="lastName"
                        {...register("lastName", { required: true })}
                        placeholder="Enter Last Name"
                        className="w-full p-2 rounded-md  text-black"
                      />
                      {errors.lastName && (
                        <span className="text-err text-sm">
                          Last Name is required.
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-start m-2 w-full">
                      <label htmlFor="phno">Phone number*</label>
                      <input
                        type="number"
                        id="phno"
                        name="phoneNumber"
                        {...register("phoneNumber", {
                          required: true,
                          maxLength: 10,
                        })}
                        placeholder="Enter Last Name"
                        className="w-full p-2 rounded-md  text-black"
                      />
                      {errors.phoneNumber && (
                        <div>
                          {errors.phoneNumber.type === "required" && (
                            <span className="text-err text-sm">
                              Phone Number is required.
                            </span>
                          )}
                          {errors.phoneNumber.type === "maxLength" && (
                            <span className="text-err text-sm">
                              Phone number should be max 10 digits
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-start m-2 w-full">
                      <label htmlFor="email">Email*</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        {...register("email", {
                          required: true,
                          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        })}
                        placeholder="Enter Email"
                        className="w-full p-2 rounded-md  text-black"
                      />
                      {errors.email && (
                        <span className="text-err text-sm">
                          Enter a Valid email
                        </span>
                      )}
                    </div>
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
                      {isSubmitting ? <LoadingButton /> : "Signup"}
                    </button>

                    <div className="text-[#575656] m-7">
                      Already have an account ? &nbsp;
                      <NavLink
                        to={"/login"}
                        className="text-white hover:text-galvin-green underline"
                      >
                        Login to Galvin music
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

export default SignUp;
