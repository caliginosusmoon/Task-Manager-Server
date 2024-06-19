const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  passWord: String,
  emailId: String,
});

const TaskUser = mongoose.model("TaskUser", userSchema);
module.exports = TaskUser;
