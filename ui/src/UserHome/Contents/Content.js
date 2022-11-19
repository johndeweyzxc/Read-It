import React from "react";
import SideInfo from "./SideInfo";
import Feed from "./Feed";
import NewPost from "./NewPost";
import "../Feed.css";

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
  const iterateFeed = (feed) => {
    return (
      <Feed
        key={feed._id}
        feedInfo={feed}
        UserName={UserName}
        FullName={FullName}
        ShowDeletePost={ShowDeletePost}
        ShowEditPost={ShowEditPost}
      />
    );
  };

  // Create a list of feeds
  const Feeds = () => {
    if (feedList.length === 0) {
      return <div className="NoPost">You have not yet created a post</div>;
    } else {
      return <div>{feedList.map(iterateFeed)}</div>;
    }
  };

  return (
    <div className="ContentDiv">
      <SideInfo fullName={FullName} userName={UserName} totalLikes={TotalLikes} cakeDay={CakeDay} />
      <div className="ml-8 mr-8 flex-grow-[3] phone:ml-4 phone:mr-4 phone:flex-grow">
        <NewPost setFeedList={setFeedList} />
        <Feeds />
      </div>
    </div>
  );
}
