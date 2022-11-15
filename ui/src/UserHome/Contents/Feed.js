import React from "react";
import GlobeIcon from "./Assets/Globe-icon.png";
import LockIcon from "./Assets/Lock-icon.png";
import EditIcon from "./Assets/Edit-icon.png";
import TrashIcon from "./Assets/Trash-icon.png";
import "../feed.css";

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

  // This component shows up in the header part of the feed if the screen size is less than 1000 pixel
  const HeaderUpdateDelete = () => {
    const headerMods = (
      <div className="hidden self-center phone:flex-row phone:flex">
        <div
          className="hidden self-center phone:flex-row phone:flex"
          onClick={() => {
            ShowEditPost(feedId, showPublic, feedContent);
          }}
        >
          <img
            className="hidden mr-2 aspect-square h-2 self-center phone:block"
            src={EditIcon}
            alt={"Edit this post"}
          />
          <div className="mr-2 text-[#2525259d] text-xs self-center tablet:self-start">Edit</div>
        </div>

        <div
          className="hidden self-center phone:flex-row phone:flex"
          onClick={() => {
            ShowDeletePost(feedId);
          }}
        >
          <img
            className="hidden mr-2 aspect-square h-2 self-center phone:block"
            src={TrashIcon}
            alt={"Delete this post"}
          />
          <div className="mr-2 text-[#2525259d] text-xs self-center tablet:self-start">Delete</div>
        </div>
      </div>
    );

    if (AllowModifications) {
      return headerMods;
    } else {
      return null;
    }
  };

  const Header = () => {
    return (
      <div className="p-2 mr-1 flex justify-between border-b-[1px] border-solid border-[#999999c5] font-JetBrains">
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

          <div className="mr-2 text-[#2525259d] text-xs self-center underline tablet:self-start">
            @{UserName}
          </div>
          <div className="text-[#2525259d] tablet:hidden">·</div>
          <img
            className="mr-2 aspect-square h-4 self-center tablet:hidden"
            src={showPublic ? GlobeIcon : LockIcon}
            alt={"Post privacy status"}
          />
        </div>

        <div className="flex phone:hidden">
          <div className="flex stablet:flex-col stablet:mr-4">
            <div className="mr-2 text-[#2525259d] text-xs self-center tablet:self-start">Posted on</div>
            <div className="mr-2 text-[#2525259d] text-xs self-center tablet:self-start">
              {feedPostedAt}
            </div>
          </div>

          <div className="flex stablet:flex-col stablet:mr-4">
            <div className="mr-2 text-[#2525259d] text-xs self-center tablet:self-start">Edited on</div>
            <div className="mr-2 text-[#2525259d] text-xs self-center tablet:self-start">
              {feedUpdatedAt}
            </div>
          </div>
        </div>
        <HeaderUpdateDelete />
      </div>
    );
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
          <div className="mr-2 self-center flex text-[#2525259d] text-sm hover:text-[#238aff]">
            {feedLikes} {feedLikes > 1 ? "Likes" : "Like"}
          </div>
          <div className="Container">
            <div className="Container" onClick={ShowEdit}>
              <img
                className="p-2 aspect-square h-8 self-center phone:hidden"
                src={EditIcon}
                alt={"Edit this post"}
              />
              <div className="mr-2 self-center flex text-[#2525259d] text-sm hover:text-[#238aff] phone:hidden">
                Edit
              </div>
            </div>
            <div className="Container" onClick={ShowDelete}>
              <img
                className="p-2 aspect-square h-8 self-center phone:hidden"
                src={TrashIcon}
                alt={"Delete this post"}
              />
              <div className="mr-2 self-center flex text-[#2525259d] text-sm hover:text-[#238aff] phone:hidden">
                Delete
              </div>
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
      <Header />
      <div className="FeedContent">{feedContent}</div>
      <Footer />
    </div>
  );
}
