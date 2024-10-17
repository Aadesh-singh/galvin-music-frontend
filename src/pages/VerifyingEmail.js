// import { NavLink } from "react-router-dom";
import ModelLayout from "../ui/ModelLayout";
import LayoutGrad from "../ui/LayoutGrad";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { verifyEmail } from "../services/AuthService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail as verifyEmailThunk } from "../store/thunk/authThunk";
import { FaCheckCircle } from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";

const VerifyingEmail = () => {
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get a specific query parameter value
  const token = queryParams.get("token");
  console.log("params value: ", token);

  useEffect(() => {
    let verify = async () => {
      try {
        await dispatch(verifyEmailThunk(token)).unwrap();
        toast.success("Email Verified successfully");
        navigate("/login");
      } catch (error) {
        console.log("Something went wrong while Verifying the user.", error);
        toast.error("Something went wrong: " + error);
        navigate("/login");
      }
    };
    verify();
  }, [token, navigate, dispatch]);
  // useEffect(() => {
  //   let verify = async () => {
  //     let res = await verifyEmail(token);
  //     if (res.success) {
  //       console.log("verification success", res);
  //       toast.success("Email Verified successfully");
  //       navigate("/login");
  //     } else {
  //       console.log("Error in verifcaton: ", res.error);
  //       toast.error("Something went wrong!");
  //     }
  //   };
  //   verify();
  // }, [token, navigate]);

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
                Verify Email
                <hr className="w-[80%] mx-auto my-[37px]" />
                {status === "loading" && (
                  <div className="flex justify-center items-center m-25 mx-auto my-5 w-[100px] h-[100px]">
                    <svg
                      className="animate-spin h-full w-full mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  </div>
                )}
                {status === "succeeded" && (
                  <div className="flex justify-center items-center m-25 mx-auto my-5 w-[100px] h-[100px]">
                    <FaCheckCircle className="text-galvin-green text-8xl" />
                  </div>
                )}
                {status === "failed" && (
                  <div className="flex justify-center items-center m-25 mx-auto my-5 w-[100px] h-[100px]">
                    <GiCrossMark className="text-err text-8xl" />
                  </div>
                )}
              </div>

              <div className="container">
                {status === "succeeded" && (
                  <div className="text-3xl">Email verified successfully</div>
                )}
                {status === "failed" && (
                  <div className="text-3xl">
                    Something went wrong in verifying Email
                  </div>
                )}
                {status === "loading" && (
                  <div className="text-3xl">Verifying Please Wait !</div>
                )}
              </div>
            </div>
          </div>
        </ModelLayout>
      </LayoutGrad>
    </>
  );
};

export default VerifyingEmail;
