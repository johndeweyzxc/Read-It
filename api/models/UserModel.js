// This is the model schema of a user profile, every update and creation of account
// goes to this schema to validate input information.

const mongoose = require("mongoose");
const DocumentName = "users";

const UserModel = new mongoose.Schema({
  // User must supply this information
  FirstName: {
    type: String,
    required: [true, "First name is required"],
    minLength: [2, "First name must be 2 or more characters"],
  },
  LastName: {
    type: String,
    required: [true, "Last name is required"],
    minLength: [2, "Last name must be 2 or more characters"],
  },
  UserName: {
    type: String,
    required: [true, "User name is required"],
  },
  Birthday: {
    type: String,
    required: [true, "Birthday is required"],
    validate: {
      // Checks birthday format, it must be {year number}-{month-number}-{day-number}
      validator: (birthday) => {
        const regDash = /[-]/g;
        const checkDashes = birthday.match(regDash);
        if (checkDashes.length != 2) {
          return false;
        }
        const [year, month, day] = birthday.split("-");
        return !isNaN(year) && !isNaN(month) && !isNaN(day);
      },
      message: "Invalid birthday date format",
    },
  },
  Password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be 8 characters long"],
  },
  Email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      // Checks if it is a valid email such as john@gmail.com kyle@mailme.com
      validator: (email) => {
        if (email.includes(".") && email.includes("@")) {
          return true;
        } else {
          return false;
        }
      },
      message: "Invalid email address",
    },
  },
  PhoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      // Returns true if the string is a number
      validator: (num) => {
        const regPattern = /[0-9]/g;
        const found = num.match(regPattern);
        return num.length === found.length;
      },
      message: "Invalid phone number",
    },
  },
  // Server will take care of this information
  CreatedPosts: {
    // User post object id in string
    type: [String],
    required: false,
  },
  PersistentId: {
    type: String,
    required: false,
  },
  CreatedAt: {
    type: String,
    required: false,
  },
  UpdatedAt: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model(DocumentName, UserModel);
