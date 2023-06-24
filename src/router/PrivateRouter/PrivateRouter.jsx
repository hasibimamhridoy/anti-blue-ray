import { useContext } from "react";
import { AuthContext } from "../../ContextProvider/AuthContextProvider";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../shared/Spinner/Spinner";
const PrivateRouter = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (!user) {
    toast("You must login first to access this page!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return (
      <Navigate to="/login" state={{ from: location }}>
        {" "}
      </Navigate>
    );
  }

  

  return <div>{children}</div>;
};

export default PrivateRouter;
