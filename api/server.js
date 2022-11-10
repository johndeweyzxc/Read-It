const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv").config();

const login = require("./routes/Read/Login");
const user = require("./routes/Read/User");
const home = require("./routes/Read/Home");
const createPost = require("./routes/Create/CreatePost");
const register = require("./routes/Create/Register");
const userUpdate = require("./routes/Update/UserUpdate");
const updatePost = require("./routes/Update/UpdatePost");
const deletePost = require("./routes/Delete/DeletePost");

function connectDatabase() {
  mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
  const database = mongoose.connection;
  database.on("error", (error) => console.log(error));
  database.once("open", () =>
    console.log("Successfully connected to database on localhost PORT 5000")
  );
}

function setupServer() {
  app.use(
    cors({
      origin: [process.env.ALLOWED_IP, process.env.ALLOWED_LOCALHOST],
    })
  );

  app.use(express.json());

  app.get("/", (_, res) => {
    return res.status(404).json({message: "Unauthorized access"});
  });

  app.use("/Register", register);
  app.use("/Login", login);
  app.use("/Home", home);

  app.use("/User", user);
  app.use("/UserUpdate", userUpdate);

  app.use("/CreatePost", createPost);
  app.use("/UpdatePost", updatePost);

  app.use("/DeletePost", deletePost);

  app.listen(4000, () => {
    console.log(`\nRest API Server started at ${process.env.SERVER_URL}`);
  });
}

connectDatabase();
setupServer();
