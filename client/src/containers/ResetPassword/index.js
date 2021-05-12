import { connect } from 'react-redux';
import ResetPassword from '../../components/ResetPassword';
import {changeValue} from '../../actions/forms';
import {resetPassword} from '../../actions/user';

const mapStateToProps = (state) => ({
  newPassword: state.user.newPassword,
  confirmNewPassword: state.user.confirmNewPassword
});

const mapDispatchToProps = (dispatch) => ({
  changeFieldValue: (newValue, name) => {
    dispatch(changeValue(newValue, name));
  },
  handleResetPasswordSubmit: (resetToken) => {
    dispatch(resetPassword(resetToken));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);