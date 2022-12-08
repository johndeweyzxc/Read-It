import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";

import DisplayPicture from "./Assets/dp-silhouette.jpg";
import GlobeIcon from "./Assets/Globe-icon.png";
import LockIcon from "./Assets/Lock-icon.png";
import EditIcon from "./Assets/Edit-icon.png";
import TrashIcon from "./Assets/Trash-icon.png";
import "./Feed.css";
import "./NewPost.css";
import ApiRequest from "./ApiFunctions";

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
    if (onGoingRequest === true) {
      // This checks if the post request is still processing
      alert("There is an on going post request. Please wait...");
      return;
    }

    const storedToken = JSON.parse(localStorage.getItem(TOKEN_ID));
    onGoingRequest = true;

    let textContent = textInputRef.current.value;
    if (!storedToken) {
      navigate("/");
    }
    const [StatusCode, Data] = await ApiRequest.createPost(storedToken, textContent, switchState);

    if (StatusCode === 400) {
      alert(Data[Object.keys(Data)[0]]);
    } else if (StatusCode === 401) {
      alert(Data);
    } else if (StatusCode === 500) {
      navigate("/ServerError");
    } else {
      // The user successfully created a new post
      let newPost = Data;
      setFeedList((current) => {
        return [newPost, ...current];
      });
      alert("You created a new post!");
      onGoingRequest = false;
    }
  };

  const iterateFeed = (feed) => {
    const feedId = feed._id;
    const feedContent = feed.Content;
    const feedLikes = feed.NumberOfLikes;
    const showPublic = feed.ShowPublic;

    return (
      <div className="FeedDiv" key={feedId}>
        <div className="FeedHeader">
          <div className="flex tablet:flex-col">
            <div className="flex">
              <div className="mr-2 text-black text-base self-center tablet:text-xs">{FullName}</div>
              <div className="text-[#2525259d] hidden tablet:block self-center">·</div>
              <img
                className="FeedStatusRight"
                src={showPublic ? GlobeIcon : LockIcon}
                alt={"Post privacy status"}
              />
            </div>
            <div className="FeedUserName">@{UserName}</div>
            <div className="text-[#2525259d] tablet:hidden">·</div>
            <img
              className="FeedStatusLeft"
              src={showPublic ? GlobeIcon : LockIcon}
              alt={"Post privacy status"}
            />
          </div>
        </div>

        <div className="FeedTextContent">{feedContent}</div>

        <div className="FeedFooter">
          <div className="FeedFooterText">
            {feedLikes} {feedLikes > 1 ? "Likes" : "Like"}
          </div>
          <div className="mr-2 self-center flex hover:text-[#238aff]">
            <div className="FeedUpdateDel" onClick={() => ShowEditPost(feedId, showPublic, feedContent)}>
              <img className="FeedIcon" src={EditIcon} alt={"Edit this post"} />
            </div>
            <div className="FeedUpdateDel" onClick={() => ShowDeletePost(feedId)}>
              <img className="FeedIcon" src={TrashIcon} alt={"Delete this post"} />
            </div>
          </div>
        </div>
      </div>
    );
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
        {feedList.length === 0 ? (
          <div className="NoPost">You have not yet created a post</div>
        ) : (
          <div>{feedList.map(iterateFeed)}</div>
        )}
      </div>
    </div>
  );
}
