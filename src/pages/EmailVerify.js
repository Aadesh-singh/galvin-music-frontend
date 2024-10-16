import { NavLink } from "react-router-dom";
import ModelLayout from "../ui/ModelLayout";
import LayoutGrad from "../ui/LayoutGrad";

const EmailVerify = () => {
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
              </div>

              <hr className="w-[80%] mx-auto my-[37px]" />

              <div className="container">
                <div>
                  A Verification Link is sent to your registered email address,
                </div>
                <div>Use the link to verify and login to continue.</div>
                <div className="m-10">
                  <NavLink
                    className="bg-galvin-grey w-full px-10 py-4 m-4 text-white font-extrabold border-0 border-white border-solid rounded-full"
                    to="/"
                  >
                    Close
                  </NavLink>
                  <NavLink
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
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </ModelLayout>
      </LayoutGrad>
    </>
  );
};

export default EmailVerify;
