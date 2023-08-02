import PageNotFound from "../pages/PageNotFound/PageNotFound.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import PublicGuard from "./Guard/publicGuard.jsx";

// create private router
const publicRouter = [
  {
    element: <PublicGuard />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

// export router
export default publicRouter;
