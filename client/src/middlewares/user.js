import axios from 'axios';
import {toast} from 'react-toastify';
import { REQUEST_VALIDATION_EMAIL } from '../actions/activation';
import { LOGIN, POST_NEW_EXERCISE, POST_NEW_TRAINING, REGISTER, resetState, SEND_RESET_PASSWORD_EMAIL, UPDATE_TRAINING_FORM } from '../actions/forms';
import { FETCH_PRIVATE_DATA, saveUser, logOut, DELETE_EXERCISE, redirect, DELETE_TRAINING, RESET_PASSWORD, DELETE_ACCOUNT} from '../actions/user';

const baseURL = "http://localhost:5000";

const user = (store) => (next) => (action) => {

  switch(action.type) {
    case LOGIN:
      {
        const state = store.getState();
        axios.post('/api/auth/login', 
        {
          email: state.user.signinEmail,
          password: state.user.signinPassword,
        }, {
          baseURL,
        })
        .then((response) => {
          if (response.data.userInfo.active) {
            store.dispatch(saveUser(response.data.userInfo.username, response.data.userInfo.id));
            localStorage.setItem("authToken", response.data.token);
          } else if (!response.data.userInfo.active) {
            toast.error("Please verify your account", {
              position: "bottom-center",
              autoClose: 5000,
              closeOnClick: true
            });
          }
        })
        .catch((error) => {
          toast.error("Wrong email or password", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true
          });
        })
        break;
      }
    case REGISTER:
      {
        const state = store.getState();
        axios.post("/api/auth/register",
        {
          username: state.user.firstname,
          email: state.user.email,
          password: state.user.password
        }, {
          baseURL,
        })
        .then((response) => {
            toast.success("Activation Email as been sent", {
              position: "bottom-center",
              autoClose: 5000,
              closeOnClick: true
            });
        })
        .catch((error) => {
            toast.error("User already exist", {
              position: "bottom-center",
              autoClose: 5000,
              closeOnClick: true
            });
        })
        break;
      }
    case REQUEST_VALIDATION_EMAIL:
      {
        axios.put(`/api/auth/register/${action.activationToken}`,
        {},
        {
          baseURL
        })
        .then((response) => {
          toast.success("Activation done", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true
          });
        })
        .catch((error) => {
          toast.error("Something went wrong", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true
          });
        })
        break;
      }
    case FETCH_PRIVATE_DATA:
      {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
        axios.get("/api/private", config, baseURL)
        .then((response) => {
          store.dispatch(saveUser(response.data.user.username, response.data.user._id, response.data.user.exercises, response.data.user.trainings));
        })
        .catch((error) => {
          localStorage.removeItem("authToken");
          store.dispatch(logOut())
        });
        break;
      }
    case POST_NEW_EXERCISE:
      {
        const state = store.getState();
        axios.put("/api/exercises/create", 
        {
          userId: state.user.id,
          name: state.user.newExerciseName
        },
        {
          baseURL
        })
        .then((response) => {
          store.dispatch(saveUser(response.data.user.username, response.data.user._id, response.data.user.exercises, response.data.user.training));
          toast.success("Exercise Created", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true
          });
        })
        .catch((error) => {
          toast.error("Something Went Wrong", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true
          });
        });
        break;
      }
    case DELETE_EXERCISE:
      {
        const state = store.getState();
        axios.delete(`/api/exercises/deleteExercise/${state.user.id}/${action.exerciseId}`,{
          baseURL
        })
        .then((response) => {
          store.dispatch(saveUser(response.data.user.username, response.data.user._id, response.data.user.exercises, response.data.user.trainings));
          toast.success("Exercise Deleted", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true
          });
        })
        .catch((error) => {
          toast.error("Something went wrong", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true
          });
        });
        break;
      }
    case POST_NEW_TRAINING:
      {
        const state = store.getState();
        const moy = state.trainings.totalReps / state.trainings.totalSets;
        axios.put("api/trainings/create",
        {
          userId: state.user.id,
          name: state.trainings.newTrainingName,
          exerciseId: state.trainings.exerciseId,
          sets: state.trainings.totalSets,
          reps: state.trainings.totalReps,
          moy 
        },
        {
          baseURL
        })
        .then((response) => {
          store.dispatch(saveUser(response.data.user.username, response.data.user._id, response.data.user.exercises, response.data.user.trainings));
          store.dispatch(resetState());
          toast.success("New Training Created", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true
          });
          store.dispatch(redirect(true))
        })
        .catch((error) => {
          toast.error("Something went wrong", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true
          });
        })
        break;
      }
    case DELETE_TRAINING:
      {
        const state = store.getState();
        axios.delete(`/api/trainings/delete/${state.user.id}/${action.trainingId}`, {
          baseURL
        })
        .then((response) => {
          store.dispatch(saveUser(response.data.user.username, response.data.user._id, response.data.user.exercises, response.data.user.trainings));
          toast.success("Training Deleted", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true
          });
        })
        .catch((error) => {
          toast.error("Something went wrong", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true
          });
        })
        break;
      }
    case UPDATE_TRAINING_FORM:
      {
        const state = store.getState();
        const moy = state.trainings.totalReps / state.trainings.totalSets;
        axios.put("/api/trainings/update", {
          userId: state.user.id,
          exerciseId: state.trainings.exerciseId,
          trainingId: action.id,
          sets: state.trainings.totalSets, 
          reps: state.trainings.totalReps,
          moy
        },
        {baseURL})
        .then((response) => {
          store.dispatch(resetState());
          store.dispatch(redirect(true));
          toast.success("Exercise added", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true
          });
        })
        .catch((error) => {
          toast.error("Something went wrong", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true
          });
        })
        break;
      }
    case SEND_RESET_PASSWORD_EMAIL:
      {
        const state = store.getState();
        axios.post("/api/auth/forgotpassword", {
          email: state.contact.resetEmail
        }, {baseURL})
        .then((response) => {
          store.dispatch(redirect(true));
        })
        .catch((error) => {
          toast.error("Something went wrong", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true
          });
        })
        break;
      }
    case RESET_PASSWORD:
      {
        const state = store.getState();
        axios.put(`api/auth/resetpassword/${action.resetToken}`, {
          password: state.user.newPassword
        }, {baseURL})
        .then((response) => {
          toast.success("Password changed", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true
          });
        })
        .catch((error) => {
          toast.error("Something went wrong", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true
          });
        })
        break;
      }
    case DELETE_ACCOUNT:
      {
        const state = store.getState();
        axios.delete(`api/auth/delete/${state.user.id}`, {
          baseURL
        })
        .then((response) => {
          toast.success("Account Deleted", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true
          });
        })
        .catch((error) => {
          toast.error("Something went wrong", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true
          });
        })
        break;
      }
    default:
      {
      }
  }
  next(action);
}

export default user;