import React from "react";
import DisplayPicture from "./Assets/dp-silhouette.jpg";

export default function SideInfo({ fullName, userName, totalLikes, cakeDay }) {
  const requiredProps = [fullName, userName, totalLikes, cakeDay];

  // Iterates through the props to check if some data is null
  for (let i = 0; i < requiredProps.length; i++) {
    if (requiredProps[i] === null || requiredProps[i] === undefined) {
      alert("Fetch data error, some components might not render properly");
      break;
    }
  }

  const TotalLikes = () => {
    return (
      <div>
        <div className="text-sm">Total Likes</div>
        <div className="text-xs text-[#6d6d6dcc]">{totalLikes}</div>
      </div>
    );
  };

  const CakeDay = () => {
    return (
      <div>
        <div className="text-sm">Cake Day</div>
        <div className="text-xs text-[#6d6d6dcc]">{cakeDay}</div>
      </div>
    );
  };

  const Profile = () => {
    return (
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
    );
  };

  const Names = () => {
    return (
      <div>
        <div className="text-base">{fullName}</div>
        <div className="text-xs text-[#6d6d6dcc] text-center">@{userName}</div>
      </div>
    );
  };

  return (
    <div
      className="
      ml-8 mr-8 mb-4 border-[1px] border-solid border-[#999999c5] rounded-sm h-[40vh] 
      max-w-[20rem] min-w-[15rem] flex-grow-[3] bg-white shadow-sm 
      hover:border-[#494949c5] tablet:hidden"
    >
      <Profile />
      <div className="mt-9 flex justify-center font-JetBrains">
        <Names />
      </div>
      <div className="mt-4 flex justify-around font-JetBrains">
        <TotalLikes />
        <CakeDay />
      </div>
    </div>
  );
}
