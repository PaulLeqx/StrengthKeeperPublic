import { connect } from 'react-redux';
import Hamburger from '../../components/Header/Hamburger';
import { deleteAccount } from '../../actions/user';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  deleteAccount: () => {
    dispatch(deleteAccount());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Hamburger);