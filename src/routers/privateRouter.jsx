import PageLayout from "../components/pageLayout/PageLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Users from "../pages/users/Users.jsx";

// create private router
const privateRouter = [
  {
    element: <PageLayout />,
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
];

// export router
export default privateRouter;
