import { Link, useLocation } from "react-router-dom";
import useAuthUserData from "../../hooks/useAuthUserData.jsx";
import ShowAuthMenu from "../../hooks/useShowMenu.jsx";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuthUserData();

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
                <li className={location.pathname === "/products" && "active"}>
                  <Link to="/products">
                    <i className="fe fe-cart"></i> <span>Products</span>
                  </Link>
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
