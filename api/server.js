const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const localIP = require("./ip");
require("dotenv").config();

const login = require("./routes/Read/Login");
const user = require("./routes/Read/User");
const home = require("./routes/Read/Home");
const createPost = require("./routes/Create/CreatePost");
const register = require("./routes/Create/Register");
const userUpdate = require("./routes/Update/UserUpdate");
const updatePost = require("./routes/Update/UpdatePost");
const deletePost = require("./routes/Delete/DeletePost");

// Default database url is mongodb://localhost:5000/ReadIt
function connectDatabase() {
  mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
  const database = mongoose.connection;
  database.on("error", (error) => console.log(error));
  database.once("open", () =>
    console.log("Successfully connected to database on localhost PORT 5000")
  );
}

function setupServer() {
  const PORT = "3000";

  // Localhost
  const localHost = `http://localhost:${PORT}`;

  // Local area network
  const IP = localIP;
  const lan = `http://${IP}:${PORT}`;

  // Allow origins from the UI server
  const UISERVER = [localHost, lan];
  app.use(
    cors({
      origin: UISERVER,
    })
  );

  app.use(express.json());

  app.get("/", (req, res) => {
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

  // UI server port: 3000
  // API server port: 4000
  // DATABASE server port: 5000

  app.listen(4000, () => {
    console.log(
      `\nRest API Server started, listening at ${IP} on PORT ${PORT}`
    );
  });
}

connectDatabase();
setupServer();
