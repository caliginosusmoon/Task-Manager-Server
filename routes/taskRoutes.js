const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.post("/add", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.put("/status/:id", taskController.updateStatus);
router.delete("/delete/:id", taskController.deleteTask);

router.get("/user/:id", taskController.getTaskByUser);
router.get("/all", taskController.getAllTasks);

module.exports = router;
