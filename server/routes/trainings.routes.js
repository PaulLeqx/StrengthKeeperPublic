const router = require("express").Router();
const trainingsController = require("../controllers/trainings.controller");

router.put("/create", trainingsController.createTraining);
router.put("/update", trainingsController.updateTraining);
router.get("/:id", trainingsController.getTrainings);
router.delete("/delete/:id/:tid", trainingsController.deleteTraining);

module.exports = router;