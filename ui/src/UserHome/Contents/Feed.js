import React from "react";
import GlobeIcon from "./Assets/Globe-icon.png";
import LockIcon from "./Assets/Lock-icon.png";
import EditIcon from "./Assets/Edit-icon.png";
import TrashIcon from "./Assets/Trash-icon.png";
import "../feed.css";

export default function Feed({ feedInfo, UserName, FullName, ShowDeletePost, ShowEditPost }) {
  const feedId = feedInfo._id;
  const feedContent = feedInfo.Content;
  const feedLikes = feedInfo.NumberOfLikes;
  const showPublic = feedInfo.ShowPublic;

  return (
    <div className="FeedDiv">
      <div className="p-2 flex justify-between border-b-[1px] border-solid border-[#999999c5] font-JetBrains">
        <div className="flex tablet:flex-col">
          <div className="flex">
            <div className="mr-2 text-black text-base self-center tablet:text-xs">{FullName}</div>
            <div className="text-[#2525259d] hidden tablet:block self-center">·</div>
            <img
              className="mr-2 aspect-square h-4 self-center hidden tablet:block"
              src={showPublic ? GlobeIcon : LockIcon}
              alt={"Post privacy status"}
            />
          </div>
          <div className="UserName">@{UserName}</div>
          <div className="text-[#2525259d] tablet:hidden">·</div>
          <img
            className="mr-2 aspect-square h-4 self-center tablet:hidden"
            src={showPublic ? GlobeIcon : LockIcon}
            alt={"Post privacy status"}
          />
        </div>

        {/* This shows up in the header part of the feed if the screen size is less than 1000 pixel */}
        <div className="hidden self-center phone:flex-row phone:flex">
          <div
            className="HeaderUpdateDelete"
            onClick={() => ShowEditPost(feedId, showPublic, feedContent)}
          >
            <img className="HeaderIcon" src={EditIcon} alt={"Edit this post"} />
            <div className="HeaderUpdateDeleteText">Edit</div>
          </div>

          <div className="HeaderUpdateDelete" onClick={() => ShowDeletePost(feedId)}>
            <img className="HeaderIcon" src={TrashIcon} alt={"Delete this post"} />
            <div className="HeaderUpdateDeleteText">Delete</div>
          </div>
        </div>
      </div>

      <div className="FeedContent">{feedContent}</div>

      <div className="FeedFooter">
        <div className="FooterText">
          {feedLikes} {feedLikes > 1 ? "Likes" : "Like"}
        </div>
        <div className="Container">
          <div className="Container" onClick={() => ShowEditPost(feedId, showPublic, feedContent)}>
            <img className="FooterIcon" src={EditIcon} alt={"Edit this post"} />
          </div>
          <div className="Container" onClick={() => ShowDeletePost(feedId)}>
            <img className="FooterIcon" src={TrashIcon} alt={"Delete this post"} />
          </div>
        </div>
      </div>
    </div>
  );
}
