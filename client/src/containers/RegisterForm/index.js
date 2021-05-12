import { connect } from 'react-redux';
import RegisterForm from '../../components/Home/RegisterForm';
import { changeValue, register } from '../../actions/forms';

const mapStateToProps = (state) => ({
  firstname: state.user.firstname,
  email: state.user.email,
  password: state.user.password,
  confirmPassword: state.user.confirmPassword
});

const mapDispatchToProps = (dispatch) => ({
  changeFieldValue: (newValue, name) => {
    dispatch(changeValue(newValue, name));
  },
  handleRegister: () => {
    dispatch(register());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);