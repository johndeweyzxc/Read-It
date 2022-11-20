import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";

import Feed from "./Feed";
import "../Feed.css";
import "../NewPost.css";
import DisplayPicture from "./Assets/dp-silhouette.jpg";

export default function HomeContent({
  feedList,
  setFeedList,
  UserName,
  FullName,
  TotalLikes,
  CakeDay,
  ShowDeletePost,
  ShowEditPost,
}) {
  const navigate = useNavigate();
  const TOKEN_ID = "tokenId";
  const textInputRef = useRef();
  const [switchState, setSwitch] = useState(false);
  let onGoingRequest = false;

  // Creates new post and sends to the backend server api
  const createNewPost = async () => {
    let response;

    if (onGoingRequest === true) {
      // This checks if the post request is still processing
      alert("There is an on going post request. Please wait...");
      return;
    }

    const storedToken = JSON.parse(localStorage.getItem(TOKEN_ID));
    const apiServerCreatePost = `http://${process.env.REACT_APP_REST_IP}:4000/CreatePost`;
    onGoingRequest = true;

    let textContent = textInputRef.current.value;
    if (!storedToken) {
      navigate("/");
    }
    try {
      response = await fetch(apiServerCreatePost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TokenId: storedToken,
          PostContent: textContent,
          ShowPublic: switchState,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    if (response) {
      textInputRef.current.value = null;
      const result = await response.json();
      const message = result.message;
      const firstMessage = Object.keys(message)[0];
      // This checks if there is an error on user inputs
      if (response.status === 400) {
        alert(message[firstMessage]);
      }
      // Invalid token or the user is not logged in
      else if (response.status === 401) {
        alert(message);
        navigate("/");
      } else if (response.status === 500) {
        navigate("/ServerError");
      }
      // The user successfully create a new post
      else {
        let newPost = message;
        setFeedList((current) => {
          return [newPost, ...current];
        });
        alert("You created a new post!");
        onGoingRequest = false;
      }
    }
  };

  const iterateFeed = (feed) => {
    return (
      <Feed
        key={feed._id}
        feedInfo={feed}
        UserName={UserName}
        FullName={FullName}
        ShowDeletePost={ShowDeletePost}
        ShowEditPost={ShowEditPost}
      />
    );
  };

  // Create a list of feeds
  const Feeds = () => {
    if (feedList.length === 0) {
      return <div className="NoPost">You have not yet created a post</div>;
    } else {
      return <div>{feedList.map(iterateFeed)}</div>;
    }
  };

  return (
    <div className="ContentDiv">
      <div
        className="
      ml-8 mr-8 mb-4 border-[1px] border-solid border-[#999999c5] rounded-sm h-[40vh] 
      max-w-[20rem] min-w-[15rem] flex-grow-[3] bg-white shadow-sm 
      hover:border-[#494949c5] tablet:hidden"
      >
        <div className="h-[35%] bg-Cherry">
          <div className="h-full flex content-center items-center justify-center">
            <img
              className="aspect-square h-16 border-[2px] border-solid border-[#1f93ff]
              rounded-full"
              src={DisplayPicture}
              alt={"User round"}
            />
          </div>
        </div>

        <div className="mt-9 flex justify-center font-JetBrains">
          <div>
            <div className="text-base">{FullName}</div>
            <div className="text-xs text-[#6d6d6dcc] text-center">@{UserName}</div>
          </div>
        </div>

        <div className="mt-4 flex justify-around font-JetBrains">
          <div>
            <div className="text-sm">Total Likes</div>
            <div className="text-xs text-[#6d6d6dcc]">{TotalLikes}</div>
          </div>
          <div>
            <div className="text-sm">Cake Day</div>
            <div className="text-xs text-[#6d6d6dcc]">{CakeDay}</div>
          </div>
        </div>
      </div>

      <div className="ml-8 mr-8 flex-grow-[3] phone:ml-4 phone:mr-4 phone:flex-grow">
        <div className="NewPostDiv">
          <div className="p-2 flex">
            <div className="NewPostTitle">Create New Post</div>
          </div>
          <div className="mt-2 mb-2 pr-2 pl-2 flex">
            <textarea className="NewPostTextArea" ref={textInputRef} />
          </div>
          <div className="p-2 flex justify-between">
            <div className="flex items-center">
              <div>Public</div>
              <Switch checked={switchState} onChange={(event) => setSwitch(event.target.checked)} />
            </div>
            <button className="SubmitNewPost" onClick={createNewPost}>
              Submit
            </button>
          </div>
        </div>
        <Feeds />
      </div>
    </div>
  );
}
