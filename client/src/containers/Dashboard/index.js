import { connect } from 'react-redux';
import Dashboard from '../../components/Dashboard';
import {fetchPrivateData} from '../../actions/user';
import {changeValue, postNewExercise} from '../../actions/forms';

const mapStateToProps = (state) => ({
  exercises: state.user.exercises,
  trainings: state.user.trainings,
  logged: state.user.logged,
  newExerciseName: state.user.newExerciseName,
  loading: state.user.loading
});

const mapDispatchToProps = (dispatch) => ({
  fetchPrivateData: () => {
    dispatch(fetchPrivateData());
  },
  changeFieldValue: (newValue, name) => {
    dispatch(changeValue(newValue, name));
  },
  postNewExercise: () => {
    dispatch(postNewExercise());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);