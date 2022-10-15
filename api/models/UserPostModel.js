// This is the model schema for user post, every updates and post creation
// goes to this schema to validate input information.

const mongoose = require("mongoose");
const DocumentName = "userpost";

const UserPostModel = new mongoose.Schema({
  // User must supply this information
  Content: {
    type: String,
    required: [true, "Post content cannot be empty"],
    minLength: [2, "Post content must be 2 or more characters"],
  },
  ShowPublic: {
    type: Boolean,
    required: true,
    default: false,
  },

  // Server will take care of this information
  LikedByCreator: {
    type: Boolean,
    required: false,
    default: false,
  },
  UserObjectId: {
    type: String,
    required: false,
  },
  NumberOfLikes: {
    type: Number,
    required: false,
    default: 0,
  },
  Likes: {
    // User object id in string
    type: [String],
    required: false,
    default: [],
  },
  PostedAt: {
    type: String,
    required: false,
  },
  UpdatedAt: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model(DocumentName, UserPostModel);
