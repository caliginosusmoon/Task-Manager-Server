const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const cors = require("cors");
const { isUtf8 } = require("buffer");
const { error } = require("console");
const req = require("express/lib/request");
app.use(cors());
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Coonected"))
  .catch((error) => console.log("Connection error", error));

app.use(express.json());
app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.listen(port, () => console.log("Server listening on port", port));
