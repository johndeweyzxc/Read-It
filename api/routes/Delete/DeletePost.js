// Route for deleting a post

const express = require("express");
const deletePost = express.Router();

const userPost = require("../../models/UserPostModel");
const users = require("../../models/UserModel");

async function DeleteUserPost(tokenid, postid) {
  let user;
  let post;

  try {
    user = await users.findOne({ PersistentId: tokenid });
  } catch (error) {
    return { statusCode: 500, message: error };
  }

  if (user === null) {
    return {
      statusCode: 401,
      message: "Invalid token id",
    };
  }

  try {
    post = await userPost.findById(postid);
  } catch (error) {
    return { statusCode: 500, message: error };
  }

  if (post === null) {
    return {
      statusCode: 401,
      message: "Invalid post id",
    };
  }

  // Check if the post is owned by the user
  if (user.id !== post.UserObjectId) {
    return { statusCode: 401, message: "Unauthorized to delete this post" };
  }

  try {
    await userPost.deleteOne({ _id: post._id });
    return { statusCode: 201, message: "Successfully deleted a post" };
  } catch (error) {
    return { statusCode: 500, message: error };
  }
}

deletePost.delete("/", async (req, res) => {
  let tokenId = req.body.TokenId;
  let postId = req.body.PostId;

  const deletedPost = await DeleteUserPost(tokenId, postId);
  let statusCode = deletedPost.statusCode;
  let message = deletedPost.message;

  if (statusCode === 500) {
    console.log(deletePost.message);
    return res.status(500).json({ message: "Internal server error" });
  } else {
    return res.status(statusCode).json({ message: message });
  }
});

module.exports = deletePost;
