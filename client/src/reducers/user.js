import { CHANGE_VALUE, LOGIN, REGISTER } from '../actions/forms';
import {LOGOUT, REDIRECT, SAVE_USER, FETCH_PRIVATE_DATA} from '../actions/user';

export const initialState = {
  username: '',
  firstname: '',
  email: '',
  logged: false,
  signinEmail: '',
  password: '',
  confirmPassword: '',
  signinPassword: '',
  newPassword: '',
  confirmNewPassword:'',
  id: '',
  newExerciseName: '',
  exercises: [],
  trainings: [],
  loading: true,
  redirect: false
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_VALUE:
      return {
        ...state,
        [action.name]: action.newValue
      }
    case REGISTER:
      return {
        ...state,
        firstname: '',
        email: '',
        password: '',
        confirmPassword: '',
      }
    case LOGIN:
      return {
        ...state,
        signinEmail: '',
        signinPassword: '',
      }
    case SAVE_USER:
      return {
        ...state,
        logged: true,
        username: action.username,
        id: action.id,
        exercises: action.exercises,
        trainings: action.trainings,
        newExerciseName: '',
      }
    case LOGOUT:
      return {
        ...state,
        username: '',
        logged: false,
        id: '',
        exercises: [],
        trainings: []
      }
    case REDIRECT:
      return {
        ...state,
        redirect: action.bool
      }
    case FETCH_PRIVATE_DATA:
    return {
      ...state,
      loading: false
    }
    default: 
      return state;
  }
};

export default reducer;