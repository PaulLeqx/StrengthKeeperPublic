import { connect } from 'react-redux';
import ForgotPassword from '../../components/ForgotPassword';
import { changeContactForm, sendResetPasswordEmail } from '../../actions/forms';

const mapStateToProps = (state) => ({
  email: state.contact.resetEmail,
  redirect: state.user.redirect
});

const mapDispatchToProps = (dispatch) => ({
  changeFieldValue: (newValue, name) => {
    dispatch(changeContactForm(newValue, name));
  },
  sendEmail: () => {
    dispatch(sendResetPasswordEmail());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);