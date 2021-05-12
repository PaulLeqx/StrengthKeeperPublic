import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import {toast} from 'react-toastify';

import {handleChange} from '../../utils';
import ExercisesList from "../../containers/ExercisesList";
import Header from "../Header";
import "./index.scss";


const Dashboard = ({ 
    fetchPrivateData, 
    exercises,
    changeFieldValue,
    newExerciseName,
    postNewExercise,
    loading
  }) => {
  let [toggleForm, setToggleForm] = useState(false);

  const handleToggleForm = () => {
    setToggleForm(!toggleForm);
  };

  useEffect(() => {
    fetchPrivateData();
  }, [fetchPrivateData]);

  const handleAddExercise = (evt) => {
    evt.preventDefault();
    if(newExerciseName === "") {
      toast.error("You need to give it a name", {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true
      });
    } else {
      postNewExercise();
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div className="home-header">
          <Header />
        </div>
        <div className="dashboard-content">
          <button onClick={handleToggleForm} className="exerciseButtons">
            {toggleForm ? <span>-</span> : <span>+</span>}
            Create Exercise
          </button>
          {toggleForm ? (
            <>
              <form className="addExerciseForm" onSubmit={handleAddExercise}>
                <input 
                  type="text" 
                  placeholder="Exercise Name" 
                  name="newExerciseName"
                  onChange={(evt) => handleChange(changeFieldValue, evt)}
                  value={newExerciseName}
                />
                <button className="addExerciseButton" action="submit">
                  <span>+</span>
                  Add
                </button>
              </form>
            </>
          ) : null}
          {!loading ? (
            exercises.map((exercise) => {
              return (<ExercisesList key={exercise._id} exercise={exercise} />);
            })
          ) : <Loader 
                type="TailSpin" 
                color="#FF0000" 
                height={100} 
                width={100}
                timeout={5000}
              />
          }
          {exercises && exercises.length > 0 ? null :
          <div className="infos">
            <h2>Welcome to StrenghtKeeper</h2>
            <p>This is your main dashboard, you can create as much exercises you want and see your progress on each one threw charts.</p>
          </div>}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  fetchPrivateData: PropTypes.func.isRequired,
  exercises: PropTypes.array,
  trainings: PropTypes.array,
  changeFieldValue: PropTypes.func.isRequired,
  newExerciseName: PropTypes.string.isRequired,
  postNewExercise: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Dashboard;
