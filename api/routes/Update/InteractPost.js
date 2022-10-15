// Dependency imports
const express = require("express");
const InteractPost = express.Router();
// App imports
const users = require("../../models/UserModel");
const userPosts = require("../../models/UserPostModel");

async function getUserPost(tokenid, postid, like) {
  let user;
  let post;
  const successfullInteraction = {
    statusCode: 201,
    message: "Successfully interacted with the post",
  };

  // Fetch the user data
  try {
    user = await users.findOne({ PersistentId: tokenid });
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }

  if (user === null) {
    return { statusCode: 401, message: "Invalid token id" };
  }

  // Fetch the user post data
  try {
    post = await userPosts.findById(postid);
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }

  if (post === null) {
    return {
      statusCode: 401,
      message: "Invalid post id",
    };
  }

  // If the user is going to like its own post
  if (user.id === post.UserObjectId && post.LikedByCreator && like) {
    return { statusCode: 400, message: "You can only like your own post once" };
  } else if (user.id === post.UserObjectId && !post.LikedByCreator && like) {
    post.set({ Likes: [...post.Likes, user.UserName] });
    post.set({ NumberOfLikes: post.NumberOfLikes + 1 });
    post.set({ LikedByCreator: true });

    try {
      await post.save();
      return successfullInteraction;
    } catch (error) {
      return { statusCode: 500, message: error.message };
    }
  }

  // The code below is when the user is going to like a post from other user

  // Append the user id to the collection of people who liked the post
  // Increment number of likes by 1
  let allLikes = post.Likes;
  let numberOfLikes = post.NumberOfLikes;
  let likerInPost = allLikes.includes(user.UserName);

  // The user already liked the post and it will do it again
  if (likerInPost && like) {
    return { statusCode: 400, message: "You already liked this post" };
  }
  // The user want to remove the like in the post
  else if (likerInPost && !like) {
    allLikes = allLikes.filter((user) => {
      user !== user.UserName;
    });

    numberOfLikes -= 1;
  }
  // The user like the post and has not yet interacted with the post before
  else if (like) {
    allLikes.push(user.UserName);
    numberOfLikes += 1;
  } else if (!like) {
    return { statusCode: 204 };
  }

  post.set({ Likes: allLikes });
  post.set({ NumberOfLikes: numberOfLikes });

  try {
    await post.save();
    return successfullInteraction;
  } catch (error) {
    return { statusCode: 500, message: error.message };
  }
}

InteractPost.post("/", async (req, res) => {
  let tokenid = req.body.TokenId;
  let postid = req.body.PostId;
  let like = req.body.Like;

  const interact = await getUserPost(tokenid, postid, like);

  if (interact.statusCode === 500) {
    return res.status(500).json({ message: interact.message });
  } else {
    return res.status(interact.statusCode).json({ message: interact.message });
  }
});

module.exports = InteractPost;
