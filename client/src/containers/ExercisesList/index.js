import { connect } from 'react-redux';
import ExercicesList from '../../components/Dashboard/ExercisesList';

import {deleteExercise} from '../../actions/user';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  deleteExercise: (exerciseId) => {
    dispatch(deleteExercise(exerciseId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ExercicesList);