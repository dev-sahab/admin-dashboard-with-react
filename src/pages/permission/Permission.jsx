import ModalPopup from "../../components/ModalPopup/ModalPopup.jsx";
import { useEffect, useState } from "react";
import DataTable from "datatables.net-dt";
import PageHeaderTitle from "../../components/PageHeader/PageHeaderTitle.jsx";
import { createToast } from "../../utils/toastify.js";
import { useDispatch, useSelector } from "react-redux";
import {
  createPermission,
  deletePermission,
  updatePermission,
  updatePermissionStatus,
} from "../../features/user/userApiSlice.js";
import { getUserData, setMessageEmpty } from "../../features/user/userSlice.js";
import swal from "sweetalert";
import { timeago } from "../../helper/helper.js";

const Permission = () => {
  const dispatch = useDispatch();
  const { permission, error, message } = useSelector(getUserData);

  // edit data state
  const [editPermission, setEditPermission] = useState({});
  // states for permission field
  const [input, setInput] = useState({
    name: "",
  });
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleEditInputChange = (e) => {
    setEditPermission((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // submit permission add form
  const handlePermissionSubmit = (e) => {
    e.preventDefault();

    // create permission
    dispatch(createPermission(input));
  };

  // handleUpdateStatus
  const handleUpdateStatus = (id, status) => {
    dispatch(updatePermissionStatus({ id, status }));
  };

  // handle delete permission
  const handleDeletePermission = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePermission(id));
      }
    });
  };

  // handleEditPermission
  const handleEditPermission = (id) => {
    const editData = permission.find((data) => data._id == id);
    setEditPermission(editData);
  };

  // edit form submit handler
  const handleEditPermissionSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updatePermission({
        id: editPermission._id,
        data: { name: editPermission.name },
      })
    );
  };

  // effects
  useEffect(() => {
    if (error) {
      createToast(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());

      const createModal = document.getElementById("Add_Permission_Modal");
      const editModal = document.getElementById("editPermission");
      setTimeout(() => {
        createModal?.querySelector(".close").click();
        editModal?.querySelector(".close").click();
        setInput({ name: "" });
      }, 500);
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    new DataTable("#user_datatable");
  });

  return (
    <>
      {/* <!-- Page Header --> */}
      <div className="page-header">
        <div className="row">
          {/* This page header is in <div className="col-sm-7"></div> */}
          <PageHeaderTitle title="Permission" />
          <div className="col-sm-5 col">
            <button
              data-target="#Add_Permission_Modal"
              data-toggle="modal"
              className="btn btn-primary float-right mt-2"
            >
              Add New Permission
            </button>
          </div>
        </div>
      </div>
      {/* <!-- /Page Header --> */}
      <ModalPopup target="Add_Permission_Modal" title="Add Permission">
        <form onSubmit={handlePermissionSubmit}>
          <div className="mb-3">
            <label htmlFor="" className="mr-sm-2 d-block">
              Add Permission
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={handleInputChange}
                className="form-control"
              />
            </label>
          </div>
          <div className="mt-3">
            <button className="btn btn-primary btn-block">
              Add Permission
            </button>
          </div>
        </form>
      </ModalPopup>

      <ModalPopup target="editPermission" title="Edit Permission">
        <form onSubmit={handleEditPermissionSubmit}>
          <div className="mb-3">
            <label htmlFor="" className="mr-sm-2 d-block">
              Edit Permission
              <input
                type="text"
                value={editPermission.name}
                name="name"
                onChange={handleEditInputChange}
                className="form-control"
              />
            </label>
          </div>
          <div className="mt-3">
            <button className="btn btn-primary btn-block">
              Add Permission
            </button>
          </div>
        </form>
      </ModalPopup>

      <div className="row">
        <div className="col-md-12">
          {/* <!-- Recent Orders --> */}
          <div className="card card-table">
            <div className="card-header">
              <h4 className="card-title">Appointment List</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                {permission && (
                  <table
                    id="user_datatable"
                    className="table table-hover table-center mb-0"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Permissions</th>
                        <th>Slug</th>
                        <th>Created Time</th>
                        <th>Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...permission].reverse().map((item, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ width: "50px" }}>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
                            <td>{timeago(item.createdAt)}</td>
                            <td>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                  checked={item.status ? true : false}
                                />
                                <label
                                  htmlFor="status_1"
                                  className="checktoggle"
                                  onClick={() =>
                                    handleUpdateStatus(item._id, item.status)
                                  }
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td className="text-right">
                              <div className="actions">
                                <button
                                  onClick={() => handleEditPermission(item._id)}
                                  className="btn btn-warning mr-1 btn-sm"
                                  data-toggle="modal"
                                  data-target="#editPermission"
                                >
                                  <i className="fa fa-edit"></i>
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeletePermission(item._id)
                                  }
                                  className="btn btn-danger btn-sm"
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          {/* <!-- /Recent Orders --> */}
        </div>
      </div>
    </>
  );
};

export default Permission;
