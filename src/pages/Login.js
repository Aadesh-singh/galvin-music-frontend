import { NavLink } from "react-router-dom";
import LayoutGrad from "../ui/LayoutGrad";
import ModelLayout from "../ui/ModelLayout";
import SocialButton from "../ui/SocialButton";

const Login = () => {
  const submitHandler = (event) => {
    event.preventDefault();
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
                <form onSubmit={submitHandler}>
                  <div className="flex flex-col w-[50%] mx-auto">
                    <div className="flex flex-col items-start m-2 w-full">
                      <label htmlFor="email">Email or Username</label>
                      <input
                        type="text"
                        id="email"
                        placeholder="Enter Email"
                        className="w-full p-2 rounded-md  text-black"
                      />
                    </div>
                    <div className="flex flex-col items-start m-2 w-full">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        placeholder="Enter Password"
                        className="w-full p-2 rounded-md  text-black"
                      />
                    </div>

                    <button
                      className="bg-galvin-green w-full p-2 m-2 text-black font-extrabold border-0 border-white border-solid rounded-full"
                      type="submit"
                    >
                      Login
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
