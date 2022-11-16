import React from "react";
import Feed from "./Contents/Feed";
import SideInfo from "./Contents/SideInfo";

export default function UserContent({ feedList, UserName, FullName, TotalLikes, CakeDay }) {
  const requiredProps = [feedList, UserName, FullName, TotalLikes, CakeDay];
  // Iterate through the props to check if there is an undefined data
  for (let i = 0; i < requiredProps.length; i++) {
    if (requiredProps[i] === null || requiredProps[i] === undefined) {
      alert("Fetch data error, some components might not render properly");
      break;
    }
  }

  const iterateFeed = (feed) => {
    return (
      <Feed
        key={feed._id}
        feedInfo={feed}
        UserName={UserName}
        FullName={FullName}
        AllowModifications={false}
      />
    );
  };

  // Creates a list of post created by that user
  const Feeds = () => {
    if (feedList.length === 0) {
      return (
        <div
          className="p-8 border-[1px] border-solid border-[#2525259d] rounded-sm font-JetBrains
          bg-white"
        >
          This user has not yet created a post
        </div>
      );
    } else {
      return <div>{feedList.map(iterateFeed)}</div>;
    }
  };

  return (
    <div
      className="pt-[15vh] pl-24 pr-24 flex flex-row-reverse flex-wrap bg-[#c4c4c43f]
      overflow-y-hidden tablet:pl-4 tablet:pr-4 tablet:pt-[10vh] stablet:pl-0 stablet:pr-0"
    >
      <SideInfo fullName={FullName} userName={UserName} totalLikes={TotalLikes} cakeDay={CakeDay} />
      <div className="ml-8 mr-8 flex-grow-[3] phone:ml-4 phone:mr-4 phone:flex-grow">
        <Feeds />
      </div>
    </div>
  );
}
