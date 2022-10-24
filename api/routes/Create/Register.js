// Dependency imports
const express = require("express");
const register = express.Router();
// App imports
const user = require("../../models/UserModel");
const NewDate = require("../../tools/DateCreator");
const crypto = require("crypto");

function persistentTokens() {
  return crypto.randomBytes(16).toString("base64");
}

// Create new user using the users model
async function createNewAccount(
  firstname,
  lastname,
  birthday,
  username,
  password,
  email,
  phone
) {
  let newPersistentToken = persistentTokens();

  try {
    // Checks if the username is already in the database
    const userExists = await user.exists({UserName: username});
    if (userExists) {
      return {
        statusCode: 401,
        message: {UserName: "Username already exists"},
      };
    }
  } catch (error) {
    console.log(error);
    return {statusCode: 500, message: error.message};
  }

  // Create new user using the User model
  const NewUser = new user({
    FirstName: firstname,
    LastName: lastname,
    UserName: username,
    Birthday: birthday,
    Password: password,
    Email: email,
    PhoneNumber: phone,
    CreatedAt: NewDate.create(),
    UpdatedAt: NewDate.create(),
  });

  try {
    NewUser.set({PersistentId: newPersistentToken});
    await NewUser.save();
    // Returns a token to be use for some authentication like creating a post
    return {statusCode: 201, message: {token: newPersistentToken}};
  } catch (error) {
    if (error.name === "ValidationError") {
      let invalidInputs = {};

      Object.keys(error.errors).forEach((key) => {
        invalidInputs[key] = error.errors[key].message;
      });

      return {statusCode: 400, message: invalidInputs};
    }
    return {statusCode: 500, message: error.message};
  }
}

register.post("/", async (req, res) => {
  let firstName = req.body.FirstName;
  let lastName = req.body.LastName;
  let birthday = req.body.Birthday;
  let userName = req.body.UserName;
  let password = req.body.Password;
  let email = req.body.Email;
  let phone = req.body.PhoneNumber;

  const newUser = await createNewAccount(
    firstName,
    lastName,
    birthday,
    userName,
    password,
    email,
    phone
  );

  let statusCode = newUser.statusCode;
  let message = newUser.message;

  if (statusCode === 500) {
    return res.status(500).json({message: "Internal Server Error"});
  } else {
    return res.status(statusCode).json({message: message});
  }
});

module.exports = register;
