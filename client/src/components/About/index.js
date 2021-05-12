import './index.scss';
import PropTypes from 'prop-types'
import { Link} from "react-router-dom";
import {handleChange} from '../../utils';
import {toast} from 'react-toastify';

import logo from "../../assets/images/logo_small.png";
import smallLogo from '../../assets/images/logo_small_icon_only_inverted.png';

const About = ({
  senderName,
  senderEmail,
  senderMessage,
  changeFieldValue,
  resetContactForm
}) => {

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if(!senderMessage && !senderEmail && !senderName) {
      toast.error("Please provide required informations", {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true
      });
    } else if(!senderName) {
      toast.error("Please give us a name", {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true
      });
    } else if(!senderEmail) {
      toast.error("Please give us an email", {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true
      });
    } else if (!senderMessage) {
      toast.error("Please don't send empty email", {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true
      });
    } 
    else {
      sendFeedback("template_lomkqmm", {
        name: senderName,
        email: senderEmail,
        message: senderMessage
      })
    }
  };

  const sendFeedback = (templateId, variables) => {
    window.emailjs
      .send("service_4zas18k", templateId, variables)
      .then((res) => {
        resetContactForm();
        toast.success("Email Sent", {
          position: "bottom-center",
          autoClose: 5000,
          closeOnClick: true
        });
      })
      .catch((err) => {
          resetContactForm();
          toast.error("Something went wrong", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true
          });
        }
      );
  }

  return (
    <div className="about-wrapper">
        <div className="about-header">
        <Link to="/">
          {window.innerWidth > 700 ? <img src={logo} alt="" /> : <img className="smalllogo" src={smallLogo} alt="" />}
        </Link>
        <h2>Train as Hard as you Can</h2>
      </div>
      <div className="aboutme-container">
        <div className="aboutme-wrapper">
          <p>Hello, i'm Paul !<br/>I'm a web developper and this website is my first self made project !<br/>The main objective of StreghtKeeper to record your workout trainings, and see your progressions threw charts for all the exercises you do. I'll next develop this website as a mobil app !<br/> Feel free to use StrenghtKeeper as much as you need it, all your datas are private, i'll not use these for anything else !<br/>Once registered, you're free to delete your account at any time from the menu.</p>
        </div>
        <Link to="/dashboard">Let's Workout</Link>
      </div>
      <div className="aboutme-form">
        <h1>Contact Me here</h1>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">Name: *</label>
          <input 
            type="text" 
            name="senderName" 
            value={senderName} 
            onChange={(evt) => handleChange(changeFieldValue, evt)}
          />
          <label htmlFor="">Email: *</label>
          <input 
            type="text"
            name="senderEmail" 
            value={senderEmail} 
            onChange={(evt) => handleChange(changeFieldValue, evt)}
          />
          <label htmlFor="">Message: *</label>
          <textarea 
            name="senderMessage" id="" 
            cols="30" rows="10"
            value={senderMessage} 
            onChange={(evt) => handleChange(changeFieldValue, evt)}
          >
          </textarea>
          <button action="submit">send</button>
        </form>
      </div>
    </div>
  );
};

About.propTypes = {
  senderName: PropTypes.string.isRequired,
  senderEmail: PropTypes.string.isRequired,
  senderMessage: PropTypes.string.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  resetContactForm: PropTypes.func.isRequired,
};

export default About;