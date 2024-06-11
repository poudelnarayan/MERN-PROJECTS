const express = require("express");
const router = express.Router();

const taskControllers = require("../controllers/task-controllers");

router.get("/completed", taskControllers.getCompletedTasks);
router.get("/", taskControllers.getActiveTasks);

router.post("/", taskControllers.createTask);
router.patch("/:id", taskControllers.updateTask);
router.delete("/:id", taskControllers.deleteTask);

module.exports = router;
