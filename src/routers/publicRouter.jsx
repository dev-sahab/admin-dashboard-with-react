import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";

// create private router
const publicRouter = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path : "/forgot-password",
    element : <ForgotPassword />
  }
];

// export router
export default publicRouter;
