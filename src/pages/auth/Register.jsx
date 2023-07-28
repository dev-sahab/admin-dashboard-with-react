import { Link, useNavigate } from "react-router-dom";
import logoWhite from "../../assets/img/logo-white.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authApiSlice.js";
import { standardAlert } from "../../utils/sweetAlert.js";
import { createToast } from "../../utils/toastify.js";
import { setMessageEmpty } from "../../features/auth/authSlice.js";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, message } = useSelector((state) => state.auth);

  // input state
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confPassword: "",
  });

  // handle input change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle register form submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // validation
    if (!input.name || !input.email || !input.password || !input.confPassword) {
      createToast("All fields are required!", "warning");
    } else if (input.password !== input.confPassword) {
      standardAlert(
        { title: "Password Error", alert: "Password doesn't match!" },
        "error"
      );
    } else {
      dispatch(registerUser(input));
    }
  };

  useEffect(() => {
    if (error) {
      createToast(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
      navigate("/login");
      setInput({
        name: "",
        email: "",
        password: "",
        confPassword: "",
      });
    }
  }, [error, message]);
  return (
    <>
      {/* <!-- Main Wrapper --> */}
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={logoWhite} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Register</h1>
                  <p className="account-subtitle">Access to our dashboard</p>

                  {/* <!-- Form --> */}
                  <form onSubmit={handleRegisterSubmit}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={input.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={input.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Password"
                        name="password"
                        value={input.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Confirm Password"
                        name="confPassword"
                        value={input.confPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group mb-0">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                  {/* <!-- /Form --> */}

                  <div className="login-or">
                    <span className="or-line"></span>
                    <span className="span-or">or</span>
                  </div>

                  <div className="text-center dont-have">
                    Already have an account? <Link to="/login">Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Main Wrapper --> */}
    </>
  );
};

export default Register;
