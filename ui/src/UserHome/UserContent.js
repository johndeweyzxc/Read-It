// Dependency imports
import React from "react";
// App imports
import {
  HomeContentDiv,
  MainFeed,
  FeedList,
  EmptyFeed,
} from "./Contents/Content";
import Feed from "./Contents/Feed/Feed";
import SideInfo from "./Contents/SideInfo";

export default function UserContent({
  feedList,
  UserName,
  FullName,
  TotalLikes,
  CakeDay,
}) {
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
      return <EmptyFeed>This user has not yet created a post</EmptyFeed>;
    } else {
      return <FeedList>{feedList.map(iterateFeed)}</FeedList>;
    }
  };

  return (
    <HomeContentDiv>
      <SideInfo
        fullName={FullName}
        userName={UserName}
        totalLikes={TotalLikes}
        cakeDay={CakeDay}
      />
      <MainFeed>
        <Feeds />
      </MainFeed>
    </HomeContentDiv>
  );
}
