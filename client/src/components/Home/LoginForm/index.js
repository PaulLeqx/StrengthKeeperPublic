import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {handleChange} from '../../../utils';

const LoginForm = ({ 
  changeFieldValue,
  handleLogin,
  email,
  password,
}) => {

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
  };

  return (
    <div className="form-container">
      <div className="home-subcontentforms-stitle">
        <h3 className="signin">SignIn</h3>
      </div>
      <div className="form home-content-forms-login">
        <form action="" onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              name="signinEmail" 
              placeholder=""
              onChange={(evt) => handleChange(changeFieldValue, evt)}
              value={email}
            />
          </div>
          <div className="form-input">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="signinPassword" 
              placeholder=""
              onChange={(evt) => handleChange(changeFieldValue, evt)}
              value={password}
            />
          </div>
          <Link to="/forgotpassword">Forgot password</Link>
          <button className="form-button" action="submit">Connection</button>
        </form>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string
}

export default LoginForm;