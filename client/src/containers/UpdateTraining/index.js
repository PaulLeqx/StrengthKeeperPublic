import { connect } from 'react-redux';
import UpdateTraining from '../../components/UpdateTraining';
import { changeValueTraining, updateTrainingForm} from '../../actions/forms';

const mapStateToProps = (state) => ({
  exercises: state.user.exercises,
  exerciseId: state.trainings.exerciseId,
  totalSets: state.trainings.totalSets,
  totalReps: state.trainings.totalReps,
  redirect: state.user.redirect,
});

const mapDispatchToProps = (dispatch) => ({
  changeFieldValue: (newValue, name) => {
    dispatch(changeValueTraining(newValue, name))
  },
  updateTrainingForm: (id) => {
    dispatch(updateTrainingForm(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTraining);