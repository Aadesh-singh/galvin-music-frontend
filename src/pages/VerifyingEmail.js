// import { NavLink } from "react-router-dom";
import ModelLayout from "../ui/ModelLayout";
import LayoutGrad from "../ui/LayoutGrad";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { verifyEmail } from "../services/AuthService";
import { toast } from "react-toastify";

const VerifyingEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get a specific query parameter value
  const token = queryParams.get("token");
  console.log("params value: ", token);

  useEffect(() => {
    let verify = async () => {
      let res = await verifyEmail(token);
      if (res.success) {
        console.log("verification success", res);
        toast.success("Email Verified successfully");
        navigate("/login");
      } else {
        console.log("Error in verifcaton: ", res.error);
        toast.error("Something went wrong!");
      }
    };
    verify();
  }, [token, navigate]);

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
              </div>

              <div className="container">
                <div>Verifying Please Wait !</div>
                {/* <div>Use the link to verify and login to continue.</div> */}
                {/* <div className="m-10">
                  <NavLink
                    className="bg-galvin-green w-full px-10 py-4 m-4 text-black font-extrabold border-0 border-white border-solid rounded-full"
                    to="/"
                  >
                    Close
                  </NavLink>
                </div> */}
              </div>
            </div>
          </div>
        </ModelLayout>
      </LayoutGrad>
    </>
  );
};

export default VerifyingEmail;
