// Dependency imports
const express = require("express");
const userUpdate = express.Router();
// App imports
const users = require("../../models/UserModel");
const newDate = require("../../tools/DateCreator");

async function updateUser(usernameVerify, passwordVerify, changes) {
  let user;

  // User cannot modify any information if it belongs inside this array
  const doNotUpdate = [
    "CreatedPosts",
    "PersistentId",
    "CreatedAt",
    "UpdatedAt",
  ];

  // Checks if the username is already in the database
  try {
    if (!(changes.UserName === undefined)) {
      if (!(usernameVerify === changes.UserName)) {
        const username = await users.exists({ UserName: changes.UserName });
        if (username) {
          return {
            statusCode: 400,
            message: { errors: "Username is already taken" },
          };
        }
      }
    }
  } catch (error) {
    console.log(error);
  }

  try {
    user = await users.findOne({ UserName: usernameVerify });
  } catch (error) {
    return { statusCode: 500, message: error };
  }

  if (user === null || !(user.Password === passwordVerify)) {
    return { statusCode: 401, message: "Invalid username or password" };
  }

  let updates = user;
  // Update the user profile stored in the updates variable.
  Object.keys(changes).forEach((key) => {
    if (!doNotUpdate.includes(key.toString())) {
      updates[key] = changes[key];
    }
  });

  user.set(updates);
  user.set({ UpdatedAt: newDate.create() });

  try {
    await user.save();
    return {
      statusCode: 201,
      message: "Account successfully updated",
      update: changes,
    };
  } catch (error) {
    let errors = {};

    // The user input violates the Model schema and raises a ValidationError
    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return { statusCode: 400, message: errors };
    }

    // In this case the user input is not the problem
    return { statusCode: 500, message: error };
  }
}

userUpdate.patch("/", async (req, res) => {
  let userNameVerify = req.body.UserNameVerify;
  let passwordVerify = req.body.PasswordVerify;

  const newUser = await updateUser(userNameVerify, passwordVerify, req.body);

  if (newUser.statusCode === 500) {
    return res.status(500).json({ message: "Internal Server Error" });
  } else {
    // Returns 201 status code, message and the changes that have been made
    return res
      .status(newUser.statusCode)
      .json({ message: newUser.message, update: newUser.update });
  }
});

module.exports = userUpdate;
