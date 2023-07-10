import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  console.log(location.pathname);
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
              <li className={location.pathname === "/" && "active"}>
                <Link to="/">
                  <i className="fe fe-home"></i> <span>Dashboard</span>
                </Link>
              </li>
              <li className={location.pathname === "/users" && "active"}>
                <Link to="/users">
                  <i className="fe fe-user"></i> <span>Users</span>
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
