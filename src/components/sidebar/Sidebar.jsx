import { Link, useLocation } from "react-router-dom";
import useAuthUserData from "../../hooks/useAuthUserData.jsx";
import ShowAuthMenu from "../../hooks/useShowMenu.jsx";

import { SlideDown } from "react-slidedown";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const location = useLocation(); // find url location
  const { user } = useAuthUserData(); // find user data from redux state
  const [productShow, setProductShow] = useState(false); // product dropdown menu state

  useEffect(() => {
    // dropdown product menu conditions
    if (
      location.pathname !== "/products" &&
      location.pathname !== "/add-product" &&
      location.pathname !== "/product-categories" &&
      location.pathname !== "/product-tags" &&
      location.pathname !== "/product-brands"
    ) {
      setProductShow(false); // if condition not match state value will false
    } else {
      setProductShow(true); // if condition match state value will true
    }
  }, [productShow, location]);

  return (
    <>
      {/* <!-- Sidebar --> */}
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>

              {user?.role?.permissions?.includes("Dashboard") && (
                <li className={location.pathname === "/" && "active"}>
                  <Link to="/">
                    <i className="fe fe-home"></i> <span>Dashboard</span>
                  </Link>
                </li>
              )}
              <ShowAuthMenu permission="Users">
                <li className={location.pathname === "/users" && "active"}>
                  <Link to="/users">
                    <i className="fe fe-user"></i> <span>Users</span>
                  </Link>
                </li>
              </ShowAuthMenu>
              <ShowAuthMenu permission="Role">
                <li className={location.pathname === "/role" && "active"}>
                  <Link to="/role">
                    <i className="fa fa-anchor"></i> <span>Role</span>
                  </Link>
                </li>

                <li className={location.pathname === "/permission" && "active"}>
                  <Link to="/permission">
                    <i className="fe fe-lock"></i> <span>Permission</span>
                  </Link>
                </li>
              </ShowAuthMenu>

              <ShowAuthMenu permission="Products">
                <li
                  className={`submenu ${
                    location.pathname === "/products" ||
                    location.pathname === "/add-product" ||
                    location.pathname === "/product-categories" ||
                    location.pathname === "/product-tags" ||
                    location.pathname === "/product-brands"
                      ? "active"
                      : ""
                  }`}
                >
                  <Link
                    to="/products"
                    onClick={() => setProductShow(true)}
                    className={productShow && "subdrop"}
                  >
                    <i className="fe fe-cart"></i> <span>Products</span>
                    <span className="menu-arrow"></span>
                  </Link>

                  <SlideDown className={"my-dropdown-slidedown"}>
                    {productShow && (
                      <ul style={{ display: productShow ? "block" : "none" }}>
                        <li>
                          <Link
                            to="/products"
                            style={
                              location.pathname === "/products"
                                ? {
                                    fontWeight: "600",
                                    color: "#5ae8ff",
                                  }
                                : null
                            }
                          >
                            All Products
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/add-product"
                            style={
                              location.pathname === "/add-product"
                                ? {
                                    fontWeight: "600",
                                    color: "#5ae8ff",
                                  }
                                : null
                            }
                          >
                            Add New
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/product-categories"
                            style={
                              location.pathname === "/product-categories"
                                ? {
                                    fontWeight: "600",
                                    color: "#5ae8ff",
                                  }
                                : null
                            }
                          >
                            Categories
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/product-tags"
                            style={
                              location.pathname === "/product-tags"
                                ? {
                                    fontWeight: "600",
                                    color: "#5ae8ff",
                                  }
                                : null
                            }
                          >
                            Tags
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/product-brands"
                            style={
                              location.pathname === "/product-brands"
                                ? {
                                    fontWeight: "600",
                                    color: "#5ae8ff",
                                  }
                                : null
                            }
                          >
                            Brands
                          </Link>
                        </li>
                      </ul>
                    )}
                  </SlideDown>
                </li>
              </ShowAuthMenu>
              <li className="menu-title">
                <span>Pages</span>
              </li>
              <li className={location.pathname === "/profile" && "active"}>
                <Link to="/profile">
                  <i className="fe fe-user-plus"></i> <span>Profile</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- /Sidebar --> */}
    </>
  );
};

export default Sidebar;
