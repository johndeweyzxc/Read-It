// Dependency imports
import React from "react";
import styled from "styled-components";
// App imports
import SideInfo from "./SideInfo";
import Feed from "./Feed";
import NewPost from "./NewPost";

export const HomeContentDiv = styled.div`
  margin: 0;
  padding: 0;
  height: auto;
  padding-top: 15vh;
  padding-left: 6rem;
  padding-right: 6rem;
  overflow-y: hidden;
  filter: blur(0px);
  @media screen and (max-width: 880px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  @media screen and (max-width: 700px) {
    padding-top: 10vh;
  }
  @media screen and (max-width: 600px) {
    padding-left: 0;
    padding-right: 0;
  }
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  background-color: #c4c4c43f;
`;

export const MainFeed = styled.div`
  margin: 0;
  padding: 0;
  margin-left: 2rem;
  margin-right: 2rem;
  flex-grow: 3;
  @media screen and (max-width: 400px) {
    margin-left: 1rem;
    margin-right: 1rem;
    flex-grow: 1;
  }
`;

export const FeedList = styled.div`
  margin: 0;
  padding: 0;
`;

export const EmptyFeed = styled.div`
  margin: 0;
  padding: 2rem;
  border: 1px solid #2525259d;
  border-radius: 2px;
  font-family: "JetBrains mono", monospace;
  background-color: #fff;
`;

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
  const requiredProps = [feedList, UserName, FullName, TotalLikes, CakeDay];

  // Iterates through the props to check if some data is undefined
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
        ShowDeletePost={ShowDeletePost}
        ShowEditPost={ShowEditPost}
        AllowModifications={true}
      />
    );
  };

  // Create a list of feeds
  const Feeds = () => {
    if (feedList.length === 0) {
      return <EmptyFeed>You have not yet created a post</EmptyFeed>;
    } else {
      return <FeedList>{feedList.map(iterateFeed)}</FeedList>;
    }
  };

  return (
    <HomeContentDiv>
      <SideInfo fullName={FullName} userName={UserName} totalLikes={TotalLikes} cakeDay={CakeDay} />
      <MainFeed>
        <NewPost setFeedList={setFeedList} />
        <Feeds />
      </MainFeed>
    </HomeContentDiv>
  );
}
