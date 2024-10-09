import { NavLink } from "react-router-dom";
import ModelLayout from "../ui/ModelLayout";
import LayoutGrad from "../ui/LayoutGrad";

const ForgetPassword = () => {
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
                Forgot Password ?
              </div>

              <hr className="w-[80%] mx-auto my-[37px]" />

              <div className="container">
                <form onSubmit={submitHandler}>
                  <div className="flex flex-col w-[50%] mx-auto">
                    <div className="flex flex-col items-start m-2 w-full">
                      <label htmlFor="email">Email or Username*</label>
                      <input
                        type="text"
                        id="email"
                        placeholder="Enter Email"
                        className="w-full p-2 rounded-md  text-black"
                      />
                    </div>

                    <button
                      className="bg-galvin-green w-full p-2 m-2 text-black font-extrabold border-0 border-white border-solid rounded-full"
                      type="submit"
                    >
                      Continue
                    </button>
                    <div className="text-[#575656] m-7">
                      Remember Password ? &nbsp;
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

export default ForgetPassword;
