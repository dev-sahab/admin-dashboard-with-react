import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Sidebar from "../sidebar/Sidebar.jsx";

const PageLayout = () => {
  return (
    <>
      {/* <!-- Main Wrapper --> */}
      <div className="main-wrapper">
        <Header />

        <Sidebar />

        {/* <!-- Page Wrapper --> */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            <Outlet />
          </div>
        </div>
        {/* <!-- /Page Wrapper --> */}
      </div>
      {/* <!-- /Main Wrapper --> */}
    </>
  );
};

export default PageLayout;
