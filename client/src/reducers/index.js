import { combineReducers } from 'redux';
import userReducer from './user';
import trainingReducer from './training';
import contactReducer from './contact';

const rootReducer = combineReducers({
  user: userReducer,
  trainings: trainingReducer,
  contact: contactReducer,
});

export default rootReducer;