import { connect } from 'react-redux';
import Home from '../../components/Home';
import { fetchPrivateData, redirect } from '../../actions/user';

const mapStateToProps = (state) => ({
  redirect: state.user.redirect,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPrivateData: () => {
    dispatch(fetchPrivateData());
  },
  setRedirect: (bool) => {
    dispatch(redirect(bool));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);