// Dependency imports
const express = require("express");
const updatePost = express.Router();
// App imports
const users = require("../../models/UserModel");
const userPosts = require("../../models/UserPostModel");
const newDate = require("../../tools/DateCreator");

// Update user post info
async function updateUserPost(tokenid, postid, newContent, showPublic) {
  let userPost;
  let user;

  // Fetch the user post
  try {
    userPost = await userPosts.findById(postid);
  } catch (error) {
    return { statusCode: 500, message: error };
  }

  if (userPost === null) {
    return {
      statusCode: 401,
      message: "Cannot find this post, invalid post id",
    };
  }

  // Fetch the user
  try {
    user = await users.findOne({ PersistentId: tokenid });
  } catch (error) {
    return { statusCode: 500, message: error };
  }

  if (user === null) {
    return {
      statusCode: 401,
      message: "Cannot update this post, invalid token",
    };
  }

  // Verify the user if it has access to the post.
  if (userPost.UserObjectId === user.id) {
    // Update the post with the new corresponding value
    userPost.set({ UpdatedAt: newDate.create() });
    userPost.set({ Content: newContent });
    userPost.set({ ShowPublic: showPublic });
  } else {
    // The user is trying to tamper to another post made by different user.
    return { statusCode: 401, message: "Unauthorized to update this post" };
  }

  try {
    await userPost.save();
    return {
      statusCode: 201,
      message: "Successfully updated the post",
    };
  } catch (error) {
    // If the user violates schema validation, return all violation as json.
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return { statusCode: 400, message: errors };
    }

    return { statusCode: 500, message: error };
  }
}

updatePost.patch("/", async (req, res) => {
  let postId = req.body.PostId;
  let tokenId = req.body.TokenId;
  let newContent = req.body.NewContent;
  let showPublic = req.body.ShowPublic;

  const newUpdate = await updateUserPost(
    tokenId,
    postId,
    newContent,
    showPublic
  );
  const statusCode = newUpdate.statusCode;
  const message = newUpdate.message;

  if (newUpdate === 500) {
    return res.status(500).json({ message: "Internal server error" });
  } else {
    return res.status(statusCode).json({ message: message });
  }
});

module.exports = updatePost;
