export const SAVE_USER = 'SAVE_USER';
export const saveUser = (username, id, exercises, trainings) => {
  
  if(exercises === undefined) {
    exercises = [];
  }
  if(trainings === undefined) {
    trainings = [];
  }

  return {
    type: SAVE_USER,
    username,
    id,
    exercises,
    trainings
  }
};

export const RESET_PASSWORD = "RESET_PASSWORD";
export const resetPassword = (resetToken) => ({
  type: RESET_PASSWORD,
  resetToken
})

export const FETCH_PRIVATE_DATA = 'FETCH_PRIVATE_DATA';
export const fetchPrivateData = () => ({
  type: FETCH_PRIVATE_DATA,
});

export const LOGOUT = 'LOGOUT';
export const logOut = () => ({
  type: LOGOUT,
});

export const DELETE_EXERCISE = 'DELETE_EXERCISE'
export const deleteExercise = (exerciseId) => ({
  type: DELETE_EXERCISE,
  exerciseId
});

export const REDIRECT = 'REDIRECT';
export const redirect = (bool) => ({
  type: REDIRECT,
  bool
});

export const DELETE_TRAINING = 'DELETE_TRAINING';
export const deleteTraining = (trainingId) => ({
  type: DELETE_TRAINING,
  trainingId
});

export const DELETE_ACCOUNT = "DELETE_ACCOUNT";;
export const deleteAccount = () => ({
  type: DELETE_ACCOUNT,
});