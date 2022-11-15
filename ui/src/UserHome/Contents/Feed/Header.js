import React from "react";
import GlobeIcon from "../Assets/Globe-icon.png";
import LockIcon from "../Assets/Lock-icon.png";
import EditIcon from "../Assets/Edit-icon.png";
import TrashIcon from "../Assets/Trash-icon.png";

export default function Header({ headerData, DeletePost, ShowEditPost }) {
  const UserName = headerData.UserName;
  const FullName = headerData.FullName;
  const feedId = headerData.feedId;
  const showPublic = headerData.showPublic;
  const feedContent = headerData.feedContent;
  const feedPostedAt = headerData.feedPostedAt;
  const feedUpdatedAt = headerData.feedUpdatedAt;
  const allowModifications = headerData.allowModifications;

  // This component shows up in the header part of the feed if the screen size is less than 1000 pixel
  function HeaderUpdateDelete() {
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
            DeletePost(feedId);
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

    if (allowModifications) {
      return headerMods;
    } else {
      return null;
    }
  }

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
}
