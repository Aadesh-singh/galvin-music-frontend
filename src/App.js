import {
  createBrowserRouter,
  // Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import ForgetPassword from "./pages/ForgetPassword";
import UploadSong from "./pages/UploadSong";

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
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
