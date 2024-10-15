import { NavLink } from "react-router-dom";
import SocialButton from "../ui/SocialButton";
import LayoutGrad from "../ui/LayoutGrad";
import ModelLayout from "../ui/ModelLayout";
import { useState } from "react";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    console.log({ firstName, lastName, email, password, cfPassword });
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
                <form onSubmit={submitHandler}>
                  <div className="flex flex-col w-[50%] mx-auto">
                    <div className="flex flex-col items-start m-2 w-full">
                      <label htmlFor="fName">First Name*</label>
                      <input
                        type="text"
                        id="fName"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter First Name"
                        className="w-full p-2 rounded-md  text-black"
                      />
                    </div>
                    <div className="flex flex-col items-start m-2 w-full">
                      <label htmlFor="lName">Last Name*</label>
                      <input
                        type="text"
                        id="lName"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter Last Name"
                        className="w-full p-2 rounded-md  text-black"
                      />
                    </div>
                    <div className="flex flex-col items-start m-2 w-full">
                      <label htmlFor="email">Email*</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                        className="w-full p-2 rounded-md  text-black"
                      />
                    </div>
                    <div className="flex flex-col items-start m-2 w-full">
                      <label htmlFor="password">Password*</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="w-full p-2 rounded-md  text-black"
                      />
                    </div>
                    <div className="flex flex-col items-start m-2 w-full">
                      <label htmlFor="cfpassword">Confirm Password*</label>
                      <input
                        type="password"
                        id="cfpassword"
                        name="confirmPassword"
                        value={cfPassword}
                        onChange={(e) => setCfPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="w-full p-2 rounded-md  text-black"
                      />
                    </div>

                    <button
                      className="bg-galvin-green w-full p-2 m-2 text-black font-extrabold border-0 border-white border-solid rounded-full"
                      type="submit"
                    >
                      Signup
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
