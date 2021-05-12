import { connect } from 'react-redux';
import LoginForm from '../../components/Home/LoginForm';
import { changeValue, login } from '../../actions/forms';

const mapStateToProps = (state) => ({
  email: state.user.signinEmail,
  password: state.user.signinPassword
});

const mapDispatchToProps = (dispatch) => ({
  changeFieldValue: (newValue, name) => {
    dispatch(changeValue(newValue, name));
  },
  handleLogin: () => {
    dispatch(login());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);