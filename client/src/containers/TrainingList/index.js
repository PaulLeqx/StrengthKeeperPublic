import { connect } from 'react-redux';
import TrainingList from '../../components/Trainings/TrainingList';
import {deleteTraining} from '../../actions/user';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  deleteTraining: (trainingId) => {
    dispatch(deleteTraining(trainingId))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingList);