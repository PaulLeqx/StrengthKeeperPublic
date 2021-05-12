import {Redirect, Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import logo from '../../assets/images/logo_small_icon_only.png';
import './index.scss';
import {handleChange} from '../../utils';

const ForgotPassword = ({
  email,
  redirect,
  changeFieldValue,
  sendEmail
}) => {

  const handleSubmit = (evt) => {
    evt.preventDefault();
    sendEmail();
  }

  return (
    <>
    {redirect ? <Redirect to="/" /> : 
      <div className="forgotpassword-container">
        <Link to="/">HomePage</Link>
        <img src={logo} alt="logo-strengt-keeper"/>
        <p>Please tell us the email you are using, you'll have ten minutes to change your password from the link we'll send to this email adress</p>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">Email</label>
          <input 
            type="email"
            value={email}
            name="resetEmail"
            onChange={(evt) => handleChange(changeFieldValue, evt)}
          />
          <button action="submit">Send</button>
        </form>
      </div>
    }
    </>
  );
};

ForgotPassword.propTypes = {
  email: PropTypes.string.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired
}

export default ForgotPassword