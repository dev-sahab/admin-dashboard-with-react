import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateGuard = () => {
  const { user } = useSelector((state) => state.auth);
  if (localStorage.getItem("user")) {
    return user ? <Outlet /> : <Navigate to="/login" />;
  }
  return <Navigate to="/login" />;
};

export default PrivateGuard;
