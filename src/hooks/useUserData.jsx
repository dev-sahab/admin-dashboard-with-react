import { useSelector } from "react-redux";
import { getUserData } from "../features/user/userSlice.js";

const useUserData = () => {
  const { user, error, message, role, permission } = useSelector(getUserData);
  return { user, error, message, role, permission };
};

export default useUserData;
