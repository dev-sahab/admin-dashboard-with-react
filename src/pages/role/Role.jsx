import ModalPopup from "../../components/ModalPopup/ModalPopup.jsx";
import { useEffect, useState } from "react";
import DataTable from "datatables.net-dt";
import PageHeaderTitle from "../../components/PageHeader/PageHeaderTitle.jsx";
import useFormFieldChange from "../../hooks/useFormFieldChange.jsx";
import { timeago } from "../../helper/helper.js";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, setMessageEmpty } from "../../features/user/userSlice.js";
import swal from "sweetalert";
import { createToast } from "../../utils/toastify.js";
import {
  createRole,
  deleteRole,
  updateRoleData,
  updateRoleStatus,
} from "../../features/user/userApiSlice.js";

const Role = () => {
  const dispatch = useDispatch();
  const { role, permission, error, message } = useSelector(getUserData);
  const permissionTrue = permission?.filter((data) => data.status == true);

  // console.log(permission.filter((data) => data.status == true));

  // input form state
  const { input, handleInputChange, resetInput } = useFormFieldChange({
    name: "",
  });

  // check box state
  const [selected, setSelected] = useState([]);

  // edit role state
  const [roleEdit, setRoleEdit] = useState({});

  // submit role create form handler
  const handleRoleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createRole({
        name: input.name,
        permissions: selected,
      })
    );
  };

  // handle checkbox change
  const handleCheckboxChange = (e) => {
    const val = e.target.value;
    const updatedList = [...selected];

    if (selected.includes(val)) {
      updatedList.splice(selected.indexOf(val), 1);
    } else {
      updatedList.push(val);
    }
    setSelected(updatedList);
  };

  // handleUpdateStatus
  const handleUpdateStatus = (id, status) => {
    dispatch(updateRoleStatus({ id, status }));
  };

  // handler for set value to Edit Role Data
  const handleEditRole = (id) => {
    const editRole = role.find((data) => data._id == id);
    setRoleEdit(editRole);
    setSelected([...editRole.permissions]);
  };

  // handle Role Edit field change
  const handleEditRoleChange = (e) => {
    setRoleEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // edit form submit handler
  const handleSubmitRoleEdit = (e) => {
    e.preventDefault();

    dispatch(
      updateRoleData({
        id: roleEdit._id,
        data: { name: roleEdit.name, permissions: selected },
      })
    );

    // close modal
    const modal = document.getElementById("EditRole");
    setTimeout(() => {
      modal.querySelector(".close").click();
    }, 500);
  };

  // handle delete permission
  const handleDeleteRole = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteRole(id));
      }
    });
  };

  // toast effects
  useEffect(() => {
    if (error) {
      createToast(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());

      // close modal
      const createModal = document.getElementById("AddRole");
      const editModal = document.getElementById("EditRole");
      setTimeout(() => {
        createModal.querySelector(".close").click();
        editModal.querySelector(".close").click();

        resetInput();
        setSelected([]);
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
          <PageHeaderTitle title="Role" />
          <div className="col-sm-5 col">
            <button
              data-target="#AddRole"
              data-toggle="modal"
              className="btn btn-primary float-right mt-2"
              onClick={() => {
                setSelected([]);
                resetInput()
              }}
            >
              Add New Role
            </button>
          </div>
        </div>
      </div>
      {/* <!-- /Page Header --> */}
      <ModalPopup target="AddRole" title="Add Role">
        <form onSubmit={handleRoleSubmit}>
          <div className="mb-3">
            <label htmlFor="" className="mr-sm-2 d-block">
              Add Role
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
            <span>Add Permissions</span>
            <hr />
            {permissionTrue?.map((item, index) => (
              <label key={index} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  value={item.name}
                  checked={selected.includes(item.name)}
                  onChange={handleCheckboxChange}
                />
                <span className="pl-1">{item.name}</span>
              </label>
            ))}
          </div>
          <div className="mt-3">
            <button className="btn btn-primary btn-block">
              Add Permission
            </button>
          </div>
        </form>
      </ModalPopup>

      <ModalPopup target="EditRole" title="Edit Role">
        <form onSubmit={handleSubmitRoleEdit}>
          <div className="mb-3">
            <label htmlFor="" className="mr-sm-2 d-block">
              Add Role
              <input
                type="text"
                value={roleEdit.name}
                name="name"
                onChange={handleEditRoleChange}
                className="form-control"
              />
            </label>
          </div>
          <div className="mt-3">
            <span>Add Permissions</span>
            <hr />
            {permissionTrue?.map((item, index) => (
              <label key={index} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  value={item.name}
                  onChange={handleCheckboxChange}
                  checked={selected?.includes(item.name)}
                />
                <span className="pl-1">{item.name}</span>
              </label>
            ))}
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
                {role && (
                  <table
                    id="user_datatable"
                    className="table table-hover table-center mb-0"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Role</th>
                        <th>Slug</th>
                        <th>Permissions</th>
                        <th>Created Time</th>
                        <th>Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...role].reverse().map((item, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ width: "50px" }}>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
                            <td>
                              <ul>
                                {item.permissions.map((name, index) => (
                                  <li key={index}>{name}</li>
                                ))}
                              </ul>
                            </td>
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
                                  onClick={() => handleEditRole(item._id)}
                                  className="btn btn-warning btn-sm mr-1"
                                  data-toggle="modal"
                                  data-target="#EditRole"
                                >
                                  <i className="fa fa-edit"></i>
                                </button>
                                <button
                                  onClick={() => handleDeleteRole(item._id)}
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

export default Role;
