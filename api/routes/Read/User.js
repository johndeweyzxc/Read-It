// This route is when the user wants to visit other users account and see their post.
// The route only returns post that are marked as public.

const express = require("express");
const user = express.Router();

const users = require("../../models/UserModel");
const userPosts = require("../../models/UserPostModel");
const date = require("../../tools/FormatDate");

async function fetchUserPost(postIds) {
  let undefinedPosts = [];
  let posts = [];
  let totalLikes = 0;

  for (let i = 0; i < postIds.length; i++) {
    let userPost;
    try {
      userPost = await userPosts.findById(postIds[i]);
    } catch (error) {
      return { statusCode: 500, message: error };
    }

    // If post are either removed or have wrong id
    if (userPost === null) {
      undefinedPosts.push(userPost);
      continue;
    }

    // Post that are marked as show public.
    if (userPost.ShowPublic) {
      let targetPost = userPost.toJSON();

      totalLikes += targetPost.NumberOfLikes;
      posts.push(targetPost);
    }
  }

  return {
    statusCode: 201,
    message: posts,
    TotalLikes: totalLikes,
    undefinedPosts: undefinedPosts,
  };
}

async function getUser(username, tokenid) {
  let user;
  let userPost;

  try {
    user = await users.findOne({ UserName: username });
  } catch (error) {
    return { statusCode: 500, message: error };
  }

  if (user === null) {
    return { statusCode: 400, message: "User does not exists" };
  }

  let userName = user.UserName;
  let fullName = `${user.FirstName} ${user.LastName}`;
  let cakeDay = date.format(user.CreatedAt);

  let createdPosts = user.CreatedPosts;
  try {
    userPost = await fetchUserPost(createdPosts, tokenid);
  } catch (error) {
    return { statusCode: 500, message: error };
  }

  if (userPost.undefinedPosts.length > 0) {
    let invalidPostId = userPost.undefinedPosts;
    // Updates the created post of the user, filter out the post that are invalid.
    let updatedUserPosts = createdPosts.filter((post) => {
      return !invalidPostId.includes(post);
    });

    user.set({ CreatedPosts: updatedUserPosts });

    try {
      await user.save();
    } catch (error) {
      return { statusCode: 500, message: error };
    }
  }

  if (userPost.statusCode === 201) {
    return {
      statusCode: 201,
      message: userPost.message,
      userName: userName,
      fullName: fullName,
      cakeDay: cakeDay,
      totalLikes: userPost.TotalLikes,
    };
  } else {
    return {
      statusCode: userPost.statusCode,
      message: userPost.message,
    };
  }
}

user.post("/:UserName", async (req, res) => {
  let tokenid = req.body.TokenId;
  let userName = req.params.UserName;
  const user = await getUser(userName, tokenid);

  if (user.statusCode === 500) {
    console.log(user.message);
    return res.status(500).json({ message: "Internal server error" });
  } else if (user.statusCode === 201) {
    return res.status(201).json({
      statusCode: 201,
      message: user.message,
      username: user.userName,
      fullname: user.fullName,
      cakeday: user.cakeDay,
      totallikes: user.totalLikes,
    });
  } else {
    return res.status(user.statusCode).json({ message: user.message });
  }
});

module.exports = user;
