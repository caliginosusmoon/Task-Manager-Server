const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: String,
  title: String,
  description: String,
  duedate: Date,
  adddate: Date,
  priority: String,
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
