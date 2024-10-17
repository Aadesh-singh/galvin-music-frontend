import { NavLink, useNavigate } from "react-router-dom";
import ModelLayout from "../ui/ModelLayout";
import LayoutGrad from "../ui/LayoutGrad";
import { GiCrossMark } from "react-icons/gi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "../ui/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sendVerificationEmail } from "../store/thunk/authThunk";

const RequestVerificationLink = () => {
  const { status } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [sendVerify, setSendVerify] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      console.log("data: ", data);
      await dispatch(sendVerificationEmail(data.email)).unwrap();
      console.log("Email sent success");
      toast.success("Email sent Successfully");
      reset();
      navigate("/email-verify");
    } catch (error) {
      console.log("Error in sending Email");
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
              <div className="flex justify-center items-center m-25 mx-auto my-5 w-[100px] h-[100px]">
                <GiCrossMark className="text-err text-8xl" />
              </div>
              <div className="text-3xl font-extrabold title-box">
                {sendVerify ? "Send Verification Link" : "Email Not Verified"}
              </div>

              <hr className="w-[80%] mx-auto my-[37px]" />

              {!sendVerify && (
                <div className="container">
                  <div>Your Registered Email address is not verified yet,</div>
                  <div>Please verify to continue.</div>
                  <div className="m-10">
                    <NavLink
                      className="bg-galvin-green w-full px-10 py-4 m-4 text-black font-extrabold border-0 border-white border-solid rounded-full"
                      to="#"
                      onClick={() => {
                        setSendVerify((prev) => !prev);
                      }}
                    >
                      Send Verification Link
                    </NavLink>
                    {/* <NavLink
                    className="bg-galvin-green w-full px-10 py-4 m-4 text-black font-extrabold border-0 border-white border-solid rounded-full"
                    to="#"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default link behavior
                      window.open(
                        'https://mail.google.com/mail/u/0/#search/subject%3A"Welcome%20to%20Galvin%20Music"',
                        "_blank"
                      );
                    }}
                  >
                    Open Gmail
                  </NavLink> */}
                  </div>
                </div>
              )}
              {sendVerify && (
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

                      <button
                        //   disabled={isSubmitting ? true : false}
                        className="bg-galvin-green w-full p-2 m-2 text-black font-extrabold border-0 border-white border-solid rounded-full"
                        type="submit"
                      >
                        {status === "loading" ? <LoadingButton /> : "Send"}
                      </button>

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
                  <div className="m-10">
                    {/* <NavLink
                    className="bg-galvin-green w-full px-10 py-4 m-4 text-black font-extrabold border-0 border-white border-solid rounded-full"
                    to="#"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default link behavior
                      window.open(
                        'https://mail.google.com/mail/u/0/#search/subject%3A"Welcome%20to%20Galvin%20Music"',
                        "_blank"
                      );
                    }}
                  >
                    Open Gmail
                  </NavLink> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </ModelLayout>
      </LayoutGrad>
    </>
  );
};

export default RequestVerificationLink;
