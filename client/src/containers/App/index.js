import { connect } from 'react-redux';
import App from '../../App';

const mapStateToProps = (state) => ({
  logged: state.user.logged,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);