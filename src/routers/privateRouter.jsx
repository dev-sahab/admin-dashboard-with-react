import PageLayout from "../components/pageLayout/PageLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Permission from "../pages/permission/Permission.jsx";
import Profile from "../pages/profile/Profile.jsx";
import Role from "../pages/role/Role.jsx";
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
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/role",
            element: <Role />,
          },
          {
            path: "/permission",
            element: <Permission />,
          },
        ],
      },
    ],
  },
];

// export router
export default privateRouter;
