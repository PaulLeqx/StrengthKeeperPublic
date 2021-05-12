export const CHANGE_VALUE = 'CHANGE_VALUE';
export const changeValue = (newValue, name) => ({
  type: CHANGE_VALUE,
  newValue,
  name,
});

export const CHANGE_CONTACT_FORM = 'CHANGE_CONTECT_FORM';
export const changeContactForm = (newValue, name) => ({
  type: CHANGE_CONTACT_FORM,
  newValue,
  name,
});

export const RESET_CONTACT_FORM = 'RESET_CONTACT_FORM';
export const resetContactForm = () => ({
  type: RESET_CONTACT_FORM,
});

export const CHANGE_VALUE_TRAINING = 'CHANGE_VALUE_TRAINING';
export const changeValueTraining = (newValue, name) => ({
  type: CHANGE_VALUE_TRAINING,
  newValue,
  name,
});

export const LOGIN = 'LOGIN';
export const login = () => ({
  type: LOGIN,
});

export const REGISTER = 'REGISTER';
export const register = () => ({
  type: REGISTER,
});

export const POST_NEW_EXERCISE = 'POST_NEW_EXERCISE';
export const postNewExercise = () => ({
  type: POST_NEW_EXERCISE,
});

export const POST_NEW_TRAINING = 'POST_NEW_TRAINING';
export const postNewTraining = () => ({
  type: POST_NEW_TRAINING,
});

export const UPDATE_TRAINING_FORM = 'UPDATE_TRAINING_FORM';
export const updateTrainingForm = (id) => ({
  type: UPDATE_TRAINING_FORM,
  id,
});

export const RESET_STATE = 'RESET_STATE';
export const resetState = () => ({
  type: RESET_STATE,
});

export const SEND_RESET_PASSWORD_EMAIL = 'SEND_RESET_PASSWORD_EMAIL';;
export const sendResetPasswordEmail = () => ({
  type: SEND_RESET_PASSWORD_EMAIL,
});