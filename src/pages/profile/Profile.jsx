import PageHeaderTitle from "../../components/PageHeader/PageHeaderTitle.jsx";
import avatar from "../../assets/avatar.png";
import useAuthUserData from "../../hooks/useAuthUserData.jsx";
import ModalPopup from "../../components/ModalPopup/ModalPopup.jsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  userPasswordReset,
  userProfileUpdate,
} from "../../features/auth/authApiSlice.js";
import { createToast } from "../../utils/toastify.js";
import { setMessageEmpty } from "../../features/auth/authSlice.js";
import "./Profile.scss";
import useToggle from "../../hooks/useToggle.jsx";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, error, message } = useAuthUserData();
  const { show: show1, toggleShow: toggleShow1 } = useToggle();
  const { show: show2, toggleShow: toggleShow2 } = useToggle();
  const { show: show3, toggleShow: toggleShow3 } = useToggle();

  // set image url
  const [image, setImage] = useState({
    url: null,
    selectedFile: null,
    value: null,
  });

  const handleImageChange = (e) => {
    setImage((prevState) => ({
      ...prevState,
      url: URL.createObjectURL(e.target.files[0]),
      selectedFile: e.target.files[0],
      value: e.target.value,
    }));
  };

  // profile iamge upload
  const handleUpdateProfileImage = () => {
    if (!image.selectedFile)
      return createToast("File is not selected!", "warning");

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("user-profile", image.selectedFile);

    dispatch(userProfileUpdate(formData));

    const modal = document.getElementById("profile-photo-update");
    setTimeout(() => {
      setImage((prevState) => ({
        ...prevState,
        url: null,
        selectedFile: null,
        value: "",
      }));
      modal.querySelector(".close").click();
    }, 500);
  };

  // password state
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    conf_password: "",
  });

  // personal details state
  const [input, setInput] = useState({
    name: "",
    birth_date: "",
    email: "",
    phone: "",
    address: "",
  });

  // handle input change
  const [hasChanges, setHasChanges] = useState(false);
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setHasChanges(true);
  };

  // set value from user
  useEffect(() => {
    setInput((prevState) => ({
      ...prevState,
      name: user?.name,
      birth_date: user?.birth_date,
      email: user.email,
      phone: user?.phone,
      address: user?.address,
    }));
  }, [setInput, user]);

  // handle update profile details
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!hasChanges) return createToast("Data has not changed!", "warning");

    dispatch(userProfileUpdate(input));
    setHasChanges(false);

    const modal = document.getElementById("edit_personal_details");
    setTimeout(() => {
      modal.querySelector(".close").click();
    }, 500);
  };
  // password change handler
  const handlePasswordChange = (e) => {
    setPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // hande reset password
  const handleResetPassword = (e) => {
    e.preventDefault();
    // fields validation
    if (
      !password.old_password ||
      !password.new_password ||
      !password.conf_password
    ) {
      return createToast("All fields are required!", "error");
    }

    // password match
    if (password.new_password !== password.conf_password) {
      return createToast("Password doesn't match!", "warning");
    }

    dispatch(
      userPasswordReset({
        email: user.email,
        old_password: password.old_password,
        new_password: password.new_password,
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
    }
  }, [error, message, dispatch]);

  return (
    <>
      {/* <!-- Page Header --> */}
      <div className="page-header">
        <div className="row">
          {/* This page header is in <div className="col-sm-7"></div> */}
          <PageHeaderTitle title="Profile" />
          <div className="col-sm-5 col"></div>
        </div>
      </div>
      {/* <!-- /Page Header --> */}
      <div className="profile-header">
        <div className="row align-items-center">
          <div className="col-auto profile-image">
            <a href="#profile-photo-update" data-toggle="modal">
              <img
                className="rounded-circle"
                alt={user?.name ? user.name : "User Image"}
                src={user?.photo ? user?.photo : avatar}
              />
              <i className="fa fa-edit update-photo"></i>
            </a>
          </div>
          <div className="col ml-md-n2 profile-user-info">
            <h4 className="user-name mb-0">{user?.name}</h4>
            <h6 className="text-muted">{user?.email}</h6>
            <div className="user-Location">
              <i className="fa fa-map-marker"></i>{" "}
              {user?.address ? user.address : "null"}
            </div>
            <div className="about-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
          <div className="col-auto profile-btn">
            <a
              href="#edit_personal_details"
              data-toggle="modal"
              className="btn btn-primary"
            >
              Edit
            </a>
          </div>
        </div>
      </div>
      <div className="profile-menu">
        <ul className="nav nav-tabs nav-tabs-solid">
          <li className="nav-item">
            <a
              className="nav-link active"
              data-toggle="tab"
              href="#per_details_tab"
            >
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#password_tab">
              Password
            </a>
          </li>
        </ul>
      </div>
      <div className="tab-content profile-tab-cont">
        {/* <!-- Personal Details Tab --> */}
        <div className="tab-pane fade show active" id="per_details_tab">
          {/* <!-- Personal Details --> */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-between">
                    <span>Personal Details</span>
                    <a
                      className="edit-link"
                      data-toggle="modal"
                      href="#edit_personal_details"
                    >
                      <i className="fa fa-edit mr-1"></i>Edit
                    </a>
                  </h5>
                  <div className="row">
                    <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                      Name
                    </p>
                    <p className="col-sm-10">{user?.name}</p>
                  </div>
                  <div className="row">
                    <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                      Date of Birth
                    </p>
                    <p className="col-sm-10">
                      {user?.birth_date ? user?.birth_date : "null"}
                    </p>
                  </div>
                  <div className="row">
                    <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                      Email ID
                    </p>
                    <p className="col-sm-10">{user?.email}</p>
                  </div>
                  <div className="row">
                    <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                      Mobile
                    </p>
                    <p className="col-sm-10">
                      {user?.phone ? user?.phone : "null"}
                    </p>
                  </div>
                  <div className="row">
                    <p className="col-sm-2 text-muted text-sm-right mb-0">
                      Address
                    </p>
                    <p className="col-sm-10 mb-0">
                      {user?.address ? user?.address : "null"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- /Personal Details --> */}
        </div>
        {/* <!-- /Personal Details Tab --> */}

        {/* <!-- Change Password Tab --> */}
        <div id="password_tab" className="tab-pane fade">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Change Password</h5>
              <div className="row">
                <div className="col-md-10 col-lg-6">
                  <form onSubmit={handleResetPassword}>
                    <div className="form-group password">
                      <label>Old Password</label>
                      <input
                        type={show1 ? "text" : "password"}
                        name="old_password"
                        value={password.old_password}
                        onChange={handlePasswordChange}
                        className="form-control"
                        placeholder="Old Password"
                      />
                      <div className="icons">
                        <i
                          style={{
                            display: show1 ? "block" : "none",
                          }}
                          className="fa fa-eye"
                          onClick={toggleShow1}
                        ></i>
                        <i
                          className="fa fa-eye-slash"
                          style={{
                            display: show1 ? "none" : "block",
                          }}
                          onClick={toggleShow1}
                        ></i>
                      </div>
                    </div>
                    <div className="form-group password">
                      <label>New Password</label>
                      <input
                        type={show2 ? "text" : "password"}
                        className="form-control"
                        name="new_password"
                        value={password.new_password}
                        onChange={handlePasswordChange}
                        placeholder="New Password"
                      />
                      <div className="icons">
                        <i
                          style={{
                            display: show2 ? "block" : "none",
                          }}
                          className="fa fa-eye"
                          onClick={toggleShow2}
                        ></i>
                        <i
                          className="fa fa-eye-slash"
                          style={{
                            display: show2 ? "none" : "block",
                          }}
                          onClick={toggleShow2}
                        ></i>
                      </div>
                    </div>
                    <div className="form-group password">
                      <label>Confirm Password</label>
                      <input
                        type={show3 ? "text" : "password"}
                        className="form-control"
                        name="conf_password"
                        value={password.conf_password}
                        onChange={handlePasswordChange}
                        placeholder="Confirm Password"
                      />
                      <div className="icons">
                        <i
                          style={{
                            display: show3 ? "block" : "none",
                          }}
                          className="fa fa-eye"
                          onClick={toggleShow3}
                        ></i>
                        <i
                          className="fa fa-eye-slash"
                          style={{
                            display: show3 ? "none" : "block",
                          }}
                          onClick={toggleShow3}
                        ></i>
                      </div>
                    </div>
                    <button className="btn btn-primary" type="submit">
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /Change Password Tab --> */}
      </div>

      {/* Edit Profile Photo Modal */}
      <ModalPopup target="profile-photo-update" title="Profile Photo">
        <div className="photo-preview text-center">
          <img
            src={!image.url ? (user?.photo ? user?.photo : avatar) : image.url}
          />
          <div className="upload-photo mt-4">
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
              value={image.value}
            />
            <button
              className="btn btn-primary mt-3 w-100"
              onClick={handleUpdateProfileImage}
            >
              Upload Profile
            </button>
          </div>
        </div>
      </ModalPopup>
      {/* /Edit Profile Photo Modal */}

      {/* <!-- Edit Details Modal --> */}
      <ModalPopup target="edit_personal_details" title="Personal Details">
        <form onSubmit={handleUpdateProfile}>
          <div className="row form-row">
            <div className="col-12">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <label>Date of Birth</label>
                {/* <div className="cal-icon"> */}
                <input
                  type="date"
                  className="form-control"
                  value={input.birth_date}
                  name="birth_date"
                  onChange={handleInputChange}
                />
                {/* </div> */}
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="form-group">
                <label>Email ID</label>
                <input
                  type="email"
                  className="form-control"
                  value={input.email}
                  onChange={handleInputChange}
                  name="email"
                />
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="form-group">
                <label>Mobile</label>
                <input
                  type="text"
                  value={input.phone}
                  onChange={handleInputChange}
                  name="phone"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-12">
              <h5 className="form-title">
                <span>Address</span>
              </h5>
            </div>
            <div className="col-12">
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={input.address}
                  onChange={handleInputChange}
                  name="address"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Save Changes
          </button>
        </form>
      </ModalPopup>
      {/* <!-- /Edit Details Modal --> */}
    </>
  );
};

export default Profile;
