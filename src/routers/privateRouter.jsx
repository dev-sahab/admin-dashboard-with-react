import PageLayout from "../components/pageLayout/PageLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Permission from "../pages/permission/Permission.jsx";
import AddProduct from "../pages/product/AddProduct.jsx";
import Brand from "../pages/product/Brand.jsx";
import Category from "../pages/product/Category.jsx";
import Product from "../pages/product/Product.jsx";
import Tag from "../pages/product/Tag.jsx";
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
          {
            path: "/products",
            element: <Product />,
          },
          {
            path: "/add-product",
            element: <AddProduct />,
          },
          {
            path: "/product-categories",
            element: <Category />,
          },
          {
            path: "/product-tags",
            element: <Tag />,
          },
          {
            path: "/product-brands",
            element: <Brand />,
          },
        ],
      },
    ],
  },
];

// export router
export default privateRouter;
