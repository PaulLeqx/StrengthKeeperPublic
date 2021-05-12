const router = require("express").Router();
const exercisesController = require("../controllers/exercises.controller");

router.put("/create", exercisesController.createExercise);
router.get("/:id", exercisesController.getExercises);
router.get("/exercise/:id", exercisesController.getExercise);
router.put("/updateExercise/:id", exercisesController.updateExercise);
router.delete("/deleteExercise/:id/:eid", exercisesController.deleteExercise);

module.exports = router;