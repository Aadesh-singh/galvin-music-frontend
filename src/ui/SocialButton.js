import { useGoogleLogin } from "@react-oauth/google";
// import FacebookLogin from "react-facebook-login";
import axios from "axios";

const SocialButton = (props) => {
  const types = {
    google: "/google.png",
    facebook: "/facebook.png",
  };

  const loginGoogle = useGoogleLogin({
    responseType: "id_token",
    // onSuccess: props.onLoginSuccess,
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      // fetching userinfo can be done on the client or the server
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);

      console.log(userInfo);
      props.onLoginSuccess(userInfo);
    },
    onError: props.onLoginFailure,
    scope: "openid profile email",
  });

  // const responseFacebook = (response) => {
  //   console.log(response);
  //   // Handle the response from Facebook
  //   if (response.accessToken) {
  //     // Make API call to your backend for further processing
  //   }
  // };

  return (
    <div>
      {props.socialType === "google" && (
        <button
          type={props.type}
          className={`${props.className} min-w-[61%] mx-auto flex justify-center items-center mt-2 border-2 py-[10px] px-[1.5rem] rounded-full border-white border-solid`}
          // onClick={props.onClick}
          onClick={loginGoogle}
        >
          <div className="w-[25px] h-[25px] mx-5">
            <img
              src={types[props.socialType]}
              alt={props.socialType}
              className="w-full h-full object-contain"
            />
          </div>
          <div className=" text-center mx-5">{props.name}</div>
        </button>
      )}
      {/* {props.socialType === "facebook" && (
        // <button
        //   type={props.type}
        //   className={`${props.className} min-w-[61%] mx-auto flex justify-center items-center mt-2 border-2 py-[10px] px-[1.5rem] rounded-full border-white border-solid`}
        //   // onClick={props.onClick}
        //   onClick={props.onClick}
        // >
        //   <div className="w-[25px] h-[25px] mx-5">
        //     <img
        //       src={types[props.socialType]}
        //       alt={props.socialType}
        //       className="w-full h-full object-contain"
        //     />
        //   </div>
        //   <div className=" text-center mx-5">{props.name}</div>
        // </button>
        <div
          className={`${props.className} w-[62%] mx-auto flex justify-center items-center mt-2 border-2 py-[10px] px-[1.5rem] rounded-full border-white border-solid`}
        >
          <div className="w-[25px] h-[25px] mx-12 ml-0">
            <img
              src={types[props.socialType]}
              alt={props.socialType}
              className="w-full h-full object-contain"
            />
          </div>

          <FacebookLogin
            appId="YOUR_APP_ID" // Replace with your Facebook App ID
            autoLoad={false} // Optional
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="" // Add your custom styles here
            // icon="fa-facebook" // Optional icon
          />
        </div>
      )} */}
    </div>
  );
};

export default SocialButton;
