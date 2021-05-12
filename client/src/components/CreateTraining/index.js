import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import './index.scss';
import Header from '../Header';
import {handleChange} from '../../utils';

const CreateTraining = ({ 
  exercises, 
  changeFieldValue,
  newTrainingName,
  exerciseId,
  totalSets,
  totalReps,
  postNewTraining,
  redirect
}) => {

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    postNewTraining();
  }

  return (
    <div className="dashboard-container">
      {redirect ? <Redirect to="/dashboard/trainings"/> : null}
      <div className="dashboard-wrapper">
      <div className="home-header">
          <Header />
        </div>
        <div className="trainingform-content">
          <div>
            <h1>You're creating a new training ...</h1>
          </div>
          <form action="">
            <p>Training of {newTrainingName}</p>
            <select
              name="exerciseId" 
              onChange={(evt) => handleChange(changeFieldValue, evt)}
              value={exerciseId}
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
            <button action="submit" onClick={handleFormSubmit}>Create training</button>
            <div className="infos">
              <span>&#8505;</span>
              <p>
                You'll be able to add more exercises to this training later by adding them from your trainings list
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

CreateTraining.propTypes = {
  exercises: PropTypes.array.isRequired,
  changeFieldValue:PropTypes.func.isRequired,
  newTrainingName:PropTypes.string.isRequired,
  exerciseId:PropTypes.string.isRequired,
  totalSets:PropTypes.string.isRequired,
  totalReps:PropTypes.string.isRequired,
  postNewTraining:PropTypes.func.isRequired,
  redirect:PropTypes.bool.isRequired
}

export default CreateTraining;