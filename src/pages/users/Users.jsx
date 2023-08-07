import ModalPopup from "../../components/ModalPopup/ModalPopup.jsx";
import { useEffect } from "react";
import DataTable from "datatables.net-dt";
import PageHeaderTitle from "../../components/PageHeader/PageHeaderTitle.jsx";
import useUserData from "../../hooks/useUserData.jsx";
import { generateRandomPassword, timeago } from "../../helper/helper.js";
import { useDispatch } from "react-redux";
import { createUser, getAllUser } from "../../features/user/userApiSlice.js";
import useFormFieldChange from "../../hooks/useFormFieldChange.jsx";
import { createToast } from "../../utils/toastify.js";
import { setMessageEmpty } from "../../features/user/userSlice.js";

const Users = () => {
  const { user, error, message, role } = useUserData();
  const dispatch = useDispatch();
  const { input, handleInputChange, resetInput, setInput } = useFormFieldChange(
    {
      name: "",
      email: "",
      password: "",
      role: "",
    }
  );

  // submit user create form
  const handleCreateUser = (e) => {
    e.preventDefault();

    dispatch(createUser(input));
  };

  // generate random password
  const handleRandomPassword = (e) => {
    e.preventDefault();
    const randPass = generateRandomPassword();

    setInput((prevState) => ({
      ...prevState,
      password: randPass,
    }));
  };

  // effects
  useEffect(() => {
    new DataTable("#user_datatable");
  });

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

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
      const createModal = document.getElementById("AddUser");
      // const editModal = document.getElementById("EditUser");
      setTimeout(() => {
        createModal.querySelector(".close").click();
        // editModal.querySelector(".close").click();
        resetInput();
      }, 500);
    }
  }, [error, message, dispatch]);

  return (
    <>
      {/* <!-- Page Header --> */}
      <div className="page-header">
        <div className="row">
          {/* This page header is in <div className="col-sm-7"></div> */}
          <PageHeaderTitle title="User" />
          <div className="col-sm-5 col">
            <button
              data-target="#AddUser"
              data-toggle="modal"
              className="btn btn-primary float-right mt-2"
            >
              Add New User
            </button>
          </div>
        </div>
      </div>
      {/* <!-- /Page Header --> */}
      <ModalPopup target="AddUser" title="Add User">
        <form onSubmit={handleCreateUser}>
          <div className="mb-3">
            <label className="d-block">
              Name
              <input
                type="text"
                className="form-control"
                placeholder="User Name"
                name="name"
                value={input.name}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="my-3">
            <label className="d-block">
              Email
              <input
                type="text"
                className="form-control"
                placeholder="User Email"
                name="email"
                value={input.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="my-3">
            <label className="d-block">
              Password
              <input
                type="text"
                className="form-control"
                placeholder="User Password"
                name="password"
                value={input.password}
                onChange={handleInputChange}
              />
            </label>
            <a href="#" onClick={handleRandomPassword}>
              Generate Password
            </a>
          </div>
          <div className="my-3">
            <label className="d-block">
              Role
              <select
                name="role"
                value={input.role}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="">-select user role-</option>
                {role?.map((item, index) => {
                  return (
                    <option value={item._id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
          <div className="mt-4">
            <button className="btn btn-primary btn-block">Add User</button>
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
                {user && (
                  <table
                    id="user_datatable"
                    className="table table-hover table-center mb-0"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...user]?.reverse().map((item, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ width: "50px" }}>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item?.role?.name}</td>
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
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td className="text-right">
                              <a
                                className="btn btn-sm bg-success-light mr-1"
                                data-toggle="modal"
                                href="#edit_specialities_details"
                              >
                                <i className="fe fe-pencil"></i> Edit
                              </a>
                              <a
                                data-toggle="modal"
                                href="#delete_modal"
                                className="btn btn-sm bg-danger-light"
                              >
                                <i className="fe fe-trash"></i> Delete
                              </a>
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

export default Users;
