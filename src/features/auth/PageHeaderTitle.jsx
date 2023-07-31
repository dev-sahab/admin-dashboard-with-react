import { Link } from "react-router-dom";

const PageHeaderTitle = ({ title }) => {
  return (
    <>
      <div className="col-sm-7 col-auto">
        <h3 className="page-title">{title}</h3>
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active">{title}</li>
        </ul>
      </div>
    </>
  );
};

export default PageHeaderTitle;
