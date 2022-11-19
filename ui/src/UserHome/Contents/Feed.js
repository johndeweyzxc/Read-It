import React from "react";
import GlobeIcon from "./Assets/Globe-icon.png";
import LockIcon from "./Assets/Lock-icon.png";
import EditIcon from "./Assets/Edit-icon.png";
import TrashIcon from "./Assets/Trash-icon.png";
import "../Feed.css";

export default function Feed({ feedInfo, UserName, FullName, ShowDeletePost, ShowEditPost }) {
  const feedId = feedInfo._id;
  const feedContent = feedInfo.Content;
  const feedLikes = feedInfo.NumberOfLikes;
  const showPublic = feedInfo.ShowPublic;

  return (
    <div className="FeedDiv">
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
}
