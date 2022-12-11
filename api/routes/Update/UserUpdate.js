// This the route when the user wants to modify the information of its profile such as username,\
// birthday, password, username and etc.

const express = require("express");
const userUpdate = express.Router();

const users = require("../../models/UserModel");
const newDate = require("../../tools/DateCreator");

async function updateUser(usernameVerify, passwordVerify, changes) {
  let user;

  // User cannot modify any information if it belongs inside this array
  const doNotUpdate = ["CreatedPosts", "PersistentId", "CreatedAt", "UpdatedAt"];

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
    return { statusCode: 500, message: error };
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

    // If the user violates the user model schema then return all the validation error.
    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return { statusCode: 400, message: errors };
    }

    return { statusCode: 500, message: error };
  }
}

userUpdate.patch("/", async (req, res) => {
  let userNameVerify = req.body.UserNameVerify;
  let passwordVerify = req.body.PasswordVerify;

  const newUser = await updateUser(userNameVerify, passwordVerify, req.body);

  if (newUser.statusCode === 500) {
    console.log(newUser.message);
    return res.status(500).json({ message: "Internal Server Error" });
  } else {
    // Returns 201 status code, message and the changes that have been made
    return res.status(newUser.statusCode).json({ message: newUser.message, update: newUser.update });
  }
});

module.exports = userUpdate;
