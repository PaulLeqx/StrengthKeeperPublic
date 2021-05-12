import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import "./index.scss";

const Training = ({ 
  id, 
  name, 
  exercises, 
  deleteTraining 
}) => {
  let history = useHistory();

  const calc = (sets, reps) => {
    return reps / sets;
  };

  const handleDeleteTraining = (evt) => {
    deleteTraining(evt.target.parentElement.nextElementSibling.firstChild.nextElementSibling.firstChild.id);
    history.push('/dashboard/trainings');
  };

  return (
    <div className="training-container">
      <div className="training-wrapper">
        <div className="topdiv">
          <button 
            onClick={handleDeleteTraining} 
            className='deletetraining'
          >
          Delete
          </button>
          <Link 
            to={`/dashboard/trainings/update/${id}`}
            className="addexercise"
          >
            Add Exercise
          </Link>
        </div>
        <div className="bottomdiv">
          <h1>{name}</h1>
          <div className="training-exercises">
            {exercises.map((exercise) => {
              return (
                <div key={exercise._id} id={id}>
                  <h2>{exercise.name}</h2>
                  <div>
                    <p>Total reps : {exercise.reps}</p>
                    <p>Series : {exercise.sets}</p>
                    <p>Reps/serie : {calc(exercise.sets, exercise.reps)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

Training.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  exercises: PropTypes.array.isRequired,
  deleteTraining: PropTypes.func.isRequired
};

export default Training;
