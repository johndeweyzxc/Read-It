import React from "react";

import Header from "./Header";
import EditIcon from "../Assets/Edit-icon.png";
import TrashIcon from "../Assets/Trash-icon.png";
import "../../home.css";

export default function Feed({
  feedInfo,
  UserName,
  FullName,
  ShowDeletePost,
  ShowEditPost,
  AllowModifications,
}) {
  const feedId = feedInfo._id;
  const feedContent = feedInfo.Content;
  const feedLikes = feedInfo.NumberOfLikes;
  const showPublic = feedInfo.ShowPublic;
  const feedPostedAt = feedInfo.PostedAt.split(":")[0];
  const feedUpdatedAt = feedInfo.UpdatedAt.split(":")[0];

  const headerData = {
    UserName: UserName,
    FullName: FullName,
    feedId: feedId,
    showPublic: showPublic,
    feedContent: feedContent,
    feedPostedAt: feedPostedAt,
    feedUpdatedAt: feedUpdatedAt,
    allowModifications: AllowModifications,
  };

  const Footer = () => {
    if (AllowModifications) {
      const ShowEdit = () => {
        ShowEditPost(feedId, showPublic, feedContent);
      };

      const ShowDelete = () => {
        ShowDeletePost(feedId);
      };

      return (
        <div className="FeedFooter">
          <div className="Likes">
            {feedLikes} {feedLikes > 1 ? "Likes" : "Like"}
          </div>
          <div className="Container">
            <div className="Container" onClick={ShowEdit}>
              <img className="Icon" src={EditIcon} alt={"Edit this post"} />
              <div className="Modify">Edit</div>
            </div>
            <div className="Container" onClick={ShowDelete}>
              <img className="Icon" src={TrashIcon} alt={"Delete this post"} />
              <div className="Modify">Delete</div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="FeedDiv">
      <Header
        headerData={headerData}
        DeletePost={() => {
          ShowDeletePost(feedId);
        }}
        ShowEditPost={ShowEditPost}
      />
      <div className="FeedContent">{feedContent}</div>
      <Footer />
    </div>
  );
}
