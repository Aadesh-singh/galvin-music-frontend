import {
  createBrowserRouter,
  // Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import ForgetPassword from "./pages/ForgetPassword";
import UploadSong from "./pages/UploadSong";
import EmailVerify from "./pages/EmailVerify";
import VerifyingEmail from "./pages/VerifyingEmail";
import RequestVerificationLink from "./pages/RequestVerificationLink";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout, restoreAuthState } from "./store/auth-slice";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Navigate to="/login" replace />, // Redirect root path to /login
  // },
  {
    path: "/",
    element: (
      // <ProtectedRoute>
      <Home />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/email-not-verified",
    element: <RequestVerificationLink />,
  },
  {
    path: "/verfying-email",
    element: <VerifyingEmail />,
  },
  {
    path: "/email-verify",
    element: <EmailVerify />,
  },
  {
    path: "/upload-song",
    element: <UploadSong />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    let user;
    if (userStr) {
      user = JSON.parse(userStr);
    }
    const expirationTime = localStorage.getItem("expirationTime");

    if (token && expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime < expirationTime) {
        // Token is still valid, restore the auth state
        console.log("session is active");
        dispatch(restoreAuthState({ token, user }));
      } else {
        console.log("session is not active");
        // Token has expired, logout
        dispatch(logout());
      }
    } else {
      // No token found, logout just in case
      dispatch(logout());
    }
  }, [dispatch]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
