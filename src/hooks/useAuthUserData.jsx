import { useSelector } from "react-redux";
import { getAuthData } from "../features/auth/authSlice.js";

const useAuthUserData = () => {
  const { user, error, message } = useSelector(getAuthData);
  return { user, error, message };
};

export default useAuthUserData;
