// Dependency imports
const express = require("express");
const createPost = express.Router();
// App imports
const userPost = require("../../models/UserPostModel");
const newDate = require("../../tools/DateCreator");
const users = require("../../models/UserModel");

async function createNewPost(tokenid, showpublic, postcontent) {
  let user;
  let userid;
  let savedPost;
  let currentPosts;

  try {
    user = await users.findOne({ PersistentId: tokenid });
  } catch (error) {
    return { statusCode: 500, message: error };
  }

  if (user === null) {
    return {
      statusCode: 401,
      message: "Cannot create a new post, invalid token",
    };
  }

  currentPosts = user.CreatedPosts;
  userid = user._id;

  // Create new post using the User post model
  let newUserPost = new userPost({
    Content: postcontent,
    ShowPublic: showpublic,
    UserObjectId: userid,
    NumberOfLikes: 0,
    Likes: [],
    PostedAt: newDate.create(),
    UpdatedAt: newDate.create(),
  });

  try {
    savedPost = await newUserPost.save();
  } catch (error) {
    // The user might violate the model schema for the user post.
    if (error.name === "ValidationError") {
      let invalidInputs = {};
      Object.keys(error.errors).forEach((key) => {
        invalidInputs[key] = error.errors[key].message;
      });
      return { statusCode: 400, message: invalidInputs };
    }

    return { statusCode: 500, message: error };
  }

  // Link the post to the user
  currentPosts.unshift(savedPost._id);
  try {
    user.set({ CreatedPosts: currentPosts });
    await user.save();
    return { statusCode: 201, message: savedPost };
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }
}

createPost.post("/", async (req, res) => {
  let tokenId = req.body.TokenId;
  let postContent = req.body.PostContent;
  let showPublic = req.body.ShowPublic;

  const newPost = await createNewPost(tokenId, showPublic, postContent);
  let statusCode = newPost.statusCode;
  let message = newPost.message;

  if (statusCode === 500) {
    return res.status(500).json({ message: "Internal server error" });
  } else {
    console.log(message);
    return res.status(statusCode).json({ message: message });
  }
});

module.exports = createPost;
