import React from "react";
import SideInfo from "./SideInfo";
import Feed from "./Feed";
import NewPost from "./NewPost";

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
      return (
        <div
          className="p-8 border-[1px] border-solid border-[#2525259d] rounded-sm font-JetBrains
          bg-white"
        >
          You have not yet created a post
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
        <NewPost setFeedList={setFeedList} />
        <Feeds />
      </div>
    </div>
  );
}
