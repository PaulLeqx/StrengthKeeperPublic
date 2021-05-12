import {Line} from 'react-chartjs-2';
import * as Zoom from 'chartjs-plugin-zoom';

import PropTypes from 'prop-types'
import './index.scss';

const ExercisesList = ({
  exercise,
  deleteExercise
}) => {

  let exerciseLabelsToDisplay = [];

  exercise.labels.map((label, id) => {
    return (exerciseLabelsToDisplay.push(`${label}(${id+1})`));
  });

  let data = {
    labels: exerciseLabelsToDisplay,
    datasets: [
      {
        label: 'Trainings Progress',
        data: exercise.datasets,
        borderColor:['#FF0000'],
        pointBackgroundColor: 'white',
        pointBorderColor: 'white',
      },
      {
        label: 'Global Progression',
        data: [],
        borderColor:['green']
      },
    ]
  };

  const handleDelete = (evt) => {
    deleteExercise(evt.target.nextElementSibling.id);
  }

  let reps = data.datasets[0].data;
  const calc = (data, reps) => {
    let min = Math.min(...reps);
    let max = Math.max(...reps);
    let length = data.labels.length;
    let ratio = (max - min) / (length -1);
    let newData = [];

    for(let i = 1; i < length; i++) {
      if (newData.length === 0) {
        newData.push(min);
      }

      let lastelement = newData[newData.length - 1];
      newData.push(lastelement + ratio);
    }
    
    let roundedLastElement = Math.round(newData[newData.length -1]);
    newData.pop();
    newData.push(roundedLastElement);
    if (roundedLastElement < min) {
      data.datasets[1].borderColor = ['orange'];
    }

    return newData;
  }

  data.datasets[1].data = calc(data,reps);

  return (
    <div className="chart">
      <button onClick={handleDelete} className="exercise-delete">delete {exercise.name}</button>
      <Line 
        id={exercise._id}
        data={data} 
        options={{
          responsive: true,
          maintainAspectRatio: false,
          title: {text: exercise.name, display: true},
          scales: {
            yAxes: [
              {
                gridLines: {
                  color: 'red',
                },
                ticks: {
                  fontSize: 12
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  color: 'red',
                },
                ticks: {
                  fontSize: 12
                }
              }
            ]
          },
          pan: {
            enabled: false,
            mode: "yx",
            speed: 10,
          },
          zoom: {
            enabled: true,
            drag: false,
            mode: "x",
          }
        }}
      />
    </div>
  );
};

ExercisesList.propTypes = {
  exercise: PropTypes.object.isRequired,
  deleteExercise: PropTypes.func.isRequired,
}

export default ExercisesList;