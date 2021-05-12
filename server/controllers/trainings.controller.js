const UserModel = require("../models/User.model");
const ErrorResponse = require("../utils/errors.utils");

module.exports.createTraining = async (req, res, next) => {
  const {name, userId, exerciseId, sets, reps, moy} = req.body;

  try {
    const user = await UserModel.findById(userId);

    const exercise = await user.exercises.id(exerciseId);
    const exerciseName = await exercise.name;
    await exercise.datasets.push(moy);
    await exercise.labels.push(name);

    const newTraining = await user.trainings.push({
      name,
      exercise: {
        exerciseId,
        name: exerciseName,
        sets,
        reps
      }
    });

    user.save()

    res.status(200).json({
      success: true,
      user
    })


  } catch (error) {
    next(error);
  }
};

module.exports.updateTraining = async (req, res ,next) => {
  const {userId, exerciseId, trainingId, sets, reps, moy} = req.body;

  try {
    const user = await UserModel.findById(userId);
    
    const exercise = await user.exercises.id(exerciseId);
    const exerciseName = await exercise.name;
    await exercise.datasets.push(moy);
    
    const training = await user.trainings.id(trainingId);
    const trainingName = training.name;
    await exercise.labels.push(trainingName);

    await training.exercise.push({
      exerciseId,
      name: exerciseName,
      sets,
      reps
    });

    user.save();
    res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    next(error);
  }
};

module.exports.getTrainings = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);

    const trainings = await user.trainings;

    res.status(200).json({
      success: true,
      trainings,
    })
  } catch (error) {
    next(error);
  }
}

module.exports.deleteTraining = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const training = await user.trainings.id(req.params.tid);
    const exercises = await user.exercises;

    if (training) {
      await user.trainings.id(req.params.tid).remove();
      user.save();
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    next(error);
  }
}