import { connect } from 'react-redux';
import CreateTraining from '../../components/CreateTraining';
import { changeValueTraining, postNewTraining } from '../../actions/forms';

const mapStateToProps = (state) => ({
  exercises: state.user.exercises,
  newTrainingName: state.trainings.newTrainingName,
  exerciseId: state.trainings.exerciseId,
  totalSets: state.trainings.totalSets,
  totalReps: state.trainings.totalReps,
  redirect: state.user.redirect,
});

const mapDispatchToProps = (dispatch) => ({
  changeFieldValue: (newValue, name) => {
    dispatch(changeValueTraining(newValue, name));
  },
  postNewTraining: () => {
    dispatch(postNewTraining());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTraining);