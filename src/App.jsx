import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routers/router.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser } from "./features/auth/authApiSlice.js";
import { setMessageEmpty } from "./features/auth/authSlice.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loggedInUser());
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
