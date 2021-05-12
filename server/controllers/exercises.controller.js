const UserModel = require("../models/User.model");
// const ExerciseModel = require("../models/User.model");
// const ErrorResponse = require("../utils/errors.utils");

module.exports.createExercise = async (req,res,next) => {
  const {name, userId, data, labels} = req.body;

  try {
    const user = await UserModel.findById(userId);

    const newExercise = await user.exercises.push({
      name,
      labels,
      data
    })

    user.save();

    res.status(201).json({
      success: true,
      data: "exercise created",
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getExercises = async (req, res, next) => {

  try {
    const user = await UserModel.findById(req.params.id);
    const exercises = await user.exercises;

    res.status(200).json({
      success: true,
      exercises
    })
  } catch (err) {
    next(err);
  }
};

module.exports.getExercise = async (req, res, next) => {
  const {exerciseId} = req.body;
  try {
    const user = await UserModel.findById(req.params.id);
    const exercise = await user.exercises.id(exerciseId);
    res.status(200).json({
      success: true,
      exercise
    })
  } catch (error) {
    next(error);
  }
};

module.exports.updateExercise = async (req, res, next) => {
  const {exerciseId, data, data2, firstDatasetId, secondDatasetId} = req.body;

  try {
    const user = await UserModel.findById(req.params.id);
    const exercise = await user.exercises.id(exerciseId);
    const firstDatasets = await exercise.datasets.id(firstDatasetId);
    if (data) {
      await firstDatasets.data.push(data);
    }
    const secondDatasets = await exercise.datasets.id(secondDatasetId);
    if (data2) {
      await secondDatasets.data.push(data2);
    }
    const response = {firstDatasets, secondDatasets};

    user.save();

    res.status(200).json({
      success: true,
      response
    })

  } catch (error) {
    next(error);
  }
};

module.exports.deleteExercise = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const exercise = await user.exercises.id(req.params.eid);
    if (exercise) {
      await user.exercises.id(req.params.eid).remove();
      user.save();
      res.status(200).json({
        success: true,
        user
      })
    } else {
      res.status(400).json({
        success:false,
        user
      })
    }
  } catch (error) {
    next(error);
  }
};