import PageLayout from "../components/pageLayout/PageLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Users from "../pages/users/Users.jsx";
import PrivateGuard from "./Guard/privateGuard.jsx";

// create private router
const privateRouter = [
  {
    element: <PageLayout />,
    children: [
      {
        element: <PrivateGuard />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/users",
            element: <Users />,
          },
        ],
      },
    ],
  },
];

// export router
export default privateRouter;
