import { connect } from 'react-redux';
import Trainings from '../../components/Trainings';
import {fetchPrivateData, redirect} from '../../actions/user';

const mapStateToProps = (state) => ({
  trainings: state.user.trainings
});

const mapDispatchToProps = (dispatch) => ({
  resetRedirect: (bool) => {
    dispatch(redirect(bool));
  },
  fetchPrivateData: () => {
    dispatch(fetchPrivateData());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Trainings);