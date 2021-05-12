import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types'
import {useParams} from 'react-router-dom';

import {handleChange} from '../../utils';
import Header from '../Header';
import './index.scss';

const UpdateTraining = ({ 
  exercises,
  changeFieldValue,
  exerciseId,
  totalSets,
  totalReps,
  updateTrainingForm,
  redirect
}) => {
  const {id} = useParams();

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    updateTrainingForm(id);
  };

  return (
    <div className="dashboard-container">
      {redirect ? <Redirect to="/dashboard/trainings"/> : null}
      <div className="dashboard-wrapper">
        <div className="home-header">
          <Header />
        </div>
        <div className="update-content">
          <div>
            <h1>You're adding a new exercise ...</h1>
          </div>
          <form action="">
            <select
              name="exerciseId"
              value={exerciseId}
              onChange={(evt) => handleChange(changeFieldValue, evt)}
            >
              Exercise choice
              <option defaultValue value="">Please choose an exercise</option>
              {exercises.map((exercise) => {
                return (
                  <option 
                    key={exercise._id} 
                    value={exercise._id}
                  >
                    {exercise.name}
                  </option>)
              })}
            </select>
            <label>Total Sets for this exercise</label>
            <input
              name="totalSets"
              type="number"
              value={totalSets}
              onChange={(evt) => handleChange(changeFieldValue, evt)}
             />
            <label>Total Reps for this exercise</label>
            <input 
              name="totalReps"
              type="number"
              value={totalReps}
              onChange={(evt) => handleChange(changeFieldValue, evt)}
            />
            <button action="submit" onClick={handleFormSubmit}>Add this Exercise</button>
            <div className="infos">
              <span>&#8505;</span>
              <p>
                Editing any training by adding an exercise will update all exercises charts you're using in any of your trainings
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

UpdateTraining.propTypes = {
  exercises: PropTypes.array.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  exerciseId: PropTypes.string.isRequired,
  totalSets: PropTypes.string.isRequired,
  totalReps: PropTypes.string.isRequired,
  updateTrainingForm: PropTypes.func.isRequired,
  redirect: PropTypes.bool.isRequired
}

export default UpdateTraining;