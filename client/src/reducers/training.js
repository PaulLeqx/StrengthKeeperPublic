import { CHANGE_VALUE_TRAINING, RESET_STATE } from '../actions/forms';


let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
if (day >= 1 && day <= 9) {
  day = `0${day}`
}
month += 1;
if (month >= 1 && month <= 9) {
  month = `0${month}`
}
year = year.toString().substr(-2);

export const initialState = {
  newTrainingName: `${day}/${month}/${year}`,
  exerciseId: '',
  totalSets: '',
  totalReps: ''
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_VALUE_TRAINING:
      return {
        ...state,
        [action.name]: action.newValue
      }
    case RESET_STATE: {
      return {
        ...state,
        exerciseId: '',
        totalSets: '',
        totalReps: ''
      }
    }
    default: 
      return state;
  }
};

export default reducer;