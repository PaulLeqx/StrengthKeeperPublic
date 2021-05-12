import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import './index.scss';

import {handleChange} from '../../utils';

const ResetPassword = ({
  newPassword,
  confirmNewPassword,
  changeFieldValue,
  handleResetPasswordSubmit
}) => {
  const {resetToken} = useParams();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if(!newPassword && !confirmNewPassword) {
      toast.error("You need to set a new Password", {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true
      });
    } else if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters", {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true
      });
    } else if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match", {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true
      });
    } else {
      handleResetPasswordSubmit(resetToken);
    }
  }

  return (
    <div className="resetpassword">
      <form action="" onSubmit={handleSubmit}>
        <input 
          value={newPassword}
          type="password"
          name="newPassword"
          placeholder="New Password"
          onChange={(evt) => handleChange(changeFieldValue, evt)}
        />
        <input 
          value={confirmNewPassword}
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          onChange={(evt) => handleChange(changeFieldValue, evt)}
        />
        <button action="submit">Confirm Changes</button>
      </form>
      <Link to="/">HomePage</Link>
    </div>
  );
};

ResetPassword.propTypes = {
  newPassword: PropTypes.string.isRequired,
  confirmNewPassword: PropTypes.string.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  handleResetPasswordSubmit: PropTypes.func.isRequired,
}

export default ResetPassword;