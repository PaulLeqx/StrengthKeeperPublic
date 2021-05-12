import { connect } from 'react-redux';
import Activation from '../../components/Activation';
import {requestValidationEmail} from '../../actions/activation';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  handleValidationEmail: (activationToken) => {
    dispatch(requestValidationEmail(activationToken));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Activation);