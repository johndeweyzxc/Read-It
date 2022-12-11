// Route for fetching users's post, in the client side when the user redirects to home page
// it always fetch data in the first render to show all the post.

const express = require("express");
const home = express.Router();

const users = require("../../models/UserModel");
const userPosts = require("../../models/UserPostModel");
const date = require("../../tools/FormatDate");

// Fetch all the post data of the user
async function fetchAllPost(postIds) {
  let posts = [];
  let undefinedPosts = [];
  let totalLikes = 0;

  for (let i = 0; i < postIds.length; i++) {
    let userPost;

    try {
      userPost = await userPosts.findOne({ _id: postIds[i] });
    } catch (error) {
      return { statusCode: 500, message: error };
    }

    // If post are either removed or have wrong id
    if (userPost === null) {
      undefinedPosts.push(userPost);
    } else {
      totalLikes += userPost.NumberOfLikes;
      posts.push(userPost);
    }
  }

  return {
    statusCode: 201,
    message: posts,
    totalLikes: totalLikes,
    undefinedPosts: undefinedPosts,
  };
}

async function fetchUserPost(tokenid) {
  let user;
  let postObjects;

  try {
    user = await users.findOne({ PersistentId: tokenid });
  } catch (error) {
    return { statusCode: 500, message: error };
  }

  if (user === null) {
    return { statusCode: 401, message: "Invalid token id" };
  }

  let posts = user.CreatedPosts;
  let cakeDay = date.format(user.CreatedAt);
  let username = user.UserName;
  let fullname = user.FirstName + " " + user.LastName;

  try {
    postObjects = await fetchAllPost(posts);
  } catch (error) {
    return { statusCode: 500, message: error };
  }

  if (postObjects.undefinedPosts.length > 0) {
    let invalidPostId = postObjects.undefinedPosts;
    // Updates the created post of the user, filter out the post that are invalid.
    let updatedUsersPosts = posts.filter((post) => {
      return !invalidPostId.includes(post);
    });

    user.set({ CreatedPosts: updatedUsersPosts });

    try {
      await user.save();
    } catch (error) {
      return { statusCode: 500, message: error };
    }
  }

  if (postObjects.statusCode === 201) {
    return {
      statusCode: 201,
      message: postObjects.message,
      userName: username,
      fullName: fullname,
      cakeDay: cakeDay,
      totalLikes: postObjects.totalLikes,
    };
  } else {
    return {
      statusCode: postObjects.statusCode,
      message: postObjects.message,
    };
  }
}

home.post("/", async (req, res) => {
  let tokenid = req.body.TokenId;
  const user = await fetchUserPost(tokenid);

  if (user.statusCode === 500) {
    console.log(user.message);
    return res.status(500).json({ message: "Internal server error" });
  } else if (user.statusCode === 201) {
    return res.status(201).json({
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

module.exports = home;
