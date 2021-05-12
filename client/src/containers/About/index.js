import { connect } from 'react-redux';
import About from '../../components/About';
import { changeContactForm, resetContactForm } from '../../actions/forms';

const mapStateToProps = (state) => ({
  senderName: state.contact.senderName,
  senderEmail: state.contact.senderEmail,
  senderMessage: state.contact.senderMessage,
});

const mapDispatchToProps = (dispatch) => ({
  changeFieldValue: (newValue, name) => {
    dispatch(changeContactForm(newValue, name));
  },
  resetContactForm: () => {
    dispatch(resetContactForm());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(About);