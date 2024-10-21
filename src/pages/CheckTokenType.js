import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth-slice";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyToken } from "../store/thunk/authThunk";
import { toast } from "react-toastify";

const CheckTokenType = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const type = queryParams.get("type");
  console.log("query: ", type, token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function logoutFirst() {
      try {
        await dispatch(logout());
        await dispatch(verifyToken(token)).unwrap();
        switch (type) {
          case "passwordReset":
            navigate(`/create-password?token=${token}`);
            break;

          default:
            break;
        }
      } catch (error) {
        toast.error("Something went wrong: " + error);
        navigate("/login");
      }
    }
    logoutFirst();
  }, [dispatch, token, navigate, type]);

  return <div>Loading...</div>;
};

export default CheckTokenType;
