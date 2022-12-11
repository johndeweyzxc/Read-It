// This is the route when the user logs in, it takes the username and password.

const express = require("express");
const login = express.Router();
const crypto = require("crypto");

const users = require("../../models/UserModel");

function persistentTokens() {
  return crypto.randomBytes(16).toString("base64");
}

async function loginUser(username, password) {
  const InvalidCredentials = {
    statusCode: 401,
    message: "Invalid username or password",
  };
  // Generate a random bytes to use as a token.
  let newPersistentToken = persistentTokens();
  let user;

  try {
    user = await users.findOne({ UserName: username });
  } catch (error) {
    return { statusCode: 500, message: error };
  }

  if (user === null) {
    return InvalidCredentials;
  }

  if (password === user.Password) {
    user.set({ PersistentId: newPersistentToken });
  } else {
    return InvalidCredentials;
  }

  try {
    await user.save();
    return { statusCode: 201, message: { token: newPersistentToken } };
  } catch (error) {
    return { statusCode: 500, message: error };
  }
}

login.post("/", async (req, res) => {
  let username = req.body.UserName;
  let password = req.body.Password;
  const loggedIn = await loginUser(username, password);

  let statusCode = loggedIn.statusCode;
  let message = loggedIn.message;

  if (statusCode === 500) {
    console.log(loggedIn.message);
    return res.status(500).json({ message: "Internal server error" });
  } else {
    return res.status(statusCode).json({ message: message });
  }
});

module.exports = login;
