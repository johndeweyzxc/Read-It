import React from "react";

import DisplayPicture from "./Assets/dp-silhouette.jpg";
import GlobeIcon from "./Assets/Globe-icon.png";
import "./Feed.css";

export default function UserContent({ feedList, UserName, FullName, TotalLikes, CakeDay }) {
  const iterateFeed = (feed) => {
    const feedId = feed._id;
    const feedContent = feed.Content;
    const feedLikes = feed.NumberOfLikes;

    return (
      <div className="FeedDiv" key={feedId}>
        <div className="FeedHeader">
          <div className="flex tablet:flex-col">
            <div className="flex">
              <div className="mr-2 text-black text-base self-center tablet:text-xs">{FullName}</div>
              <div className="text-[#2525259d] hidden tablet:block self-center">·</div>
              <img className="FeedStatusRight" src={GlobeIcon} alt={"Post privacy status"} />
            </div>
            <div className="FeedUserName">@{UserName}</div>
            <div className="text-[#2525259d] tablet:hidden">·</div>
            <img className="FeedStatusLeft" src={GlobeIcon} alt={"Post privacy status"} />
          </div>
        </div>

        <div className="FeedTextContent">{feedContent}</div>

        <div className="FeedFooter">
          <div className="FeedFooterText">
            {feedLikes} {feedLikes > 1 ? "Likes" : "Like"}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="pt-[15vh] pl-24 pr-24 flex flex-row-reverse flex-wrap bg-[#c4c4c43f]
      overflow-y-hidden tablet:pl-4 tablet:pr-4 tablet:pt-[10vh] stablet:pl-0 stablet:pr-0"
    >
      <div
        className="
      ml-8 mr-8 mb-4 border-[1px] border-solid border-[#999999c5] rounded-sm h-[40vh] 
      max-w-[20rem] min-w-[15rem] flex-grow-[3] bg-white shadow-sm 
      hover:border-[#494949c5] tablet:hidden"
      >
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

        <div className="mt-9 flex justify-center font-JetBrains">
          <div>
            <div className="text-base">{FullName}</div>
            <div className="text-xs text-[#6d6d6dcc] text-center">@{UserName}</div>
          </div>
        </div>

        <div className="mt-4 flex justify-around font-JetBrains">
          <div>
            <div className="text-sm">Total Likes</div>
            <div className="text-xs text-[#6d6d6dcc]">{TotalLikes}</div>
          </div>
          <div>
            <div className="text-sm">Cake Day</div>
            <div className="text-xs text-[#6d6d6dcc]">{CakeDay}</div>
          </div>
        </div>
      </div>
      <div className="ml-8 mr-8 flex-grow-[3] phone:ml-4 phone:mr-4 phone:flex-grow">
        {feedList.length === 0 ? (
          <div className="NoPost">This user has not yet created a post</div>
        ) : (
          <div>{feedList.map(iterateFeed)}</div>
        )}
      </div>
    </div>
  );
}
