import {toast} from 'react-toastify';
import PropTypes from "prop-types";

import { handleChange } from "../../../utils";

const RegisterForm = ({
  changeFieldValue,
  handleRegister,
  firstname,
  email,
  password,
  confirmPassword,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match", {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true
      });
    } else if(password === "" && confirmPassword === "") {
      return toast.error("You need to set passwords", {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true
      });
    } else if (password.length < 6) {
      return toast.error("Password must be at least 6 characters", {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true
      });
    } else if(email === "") {
      return toast.error("Please set an email", {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true
      });
    } else if(firstname === "") {
      return toast.error("Please set a Firstname", {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true
      });
    } else {
      handleRegister();
    }
  };

  return (
    <div className="form-container">
      <div className="home-subcontentforms-stitle">
        <h3>SignUp</h3>
      </div>
      <div className="form home-content-forms-register">
        <form action="" onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="name">Firstname</label>
            <input
              type="text"
              name="firstname"
              placeholder=""
              onChange={(evt) => handleChange(changeFieldValue, evt)}
              value={firstname}
            />
          </div>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder=""
              onChange={(evt) => handleChange(changeFieldValue, evt)}
              value={email}
            />
          </div>
          <div className="form-input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder=""
              onChange={(evt) => handleChange(changeFieldValue, evt)}
              value={password}
            />
          </div>
          <div className="form-input">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder=""
              onChange={(evt) => handleChange(changeFieldValue, evt)}
              value={confirmPassword}
            />
          </div>
          <button className="form-button" action="submit">
            Register Now
          </button>
          {/* {error ? <span className="error">&#x26D2; {error}</span> : null} */}
        </form>
      </div>
    </div>
  );
};

RegisterForm.propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
};

export default RegisterForm;
