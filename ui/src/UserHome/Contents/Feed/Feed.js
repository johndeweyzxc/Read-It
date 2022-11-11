// Dependency imports
import React from "react";
import styled from "styled-components";
//App imports
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

const FeedDiv = styled.div`
  margin-bottom: 1rem;
  border: 1px solid #999999c5;
  border-radius: 2px;
  font-family: "Roboto mono", monospace;
  background-color: #fff;
  box-shadow: 0 0 1px;
  &:hover {
    cursor: pointer;
    border: 1px solid #494949c5;
  }
`;

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

  const footerData = {
    feedId: feedId,
    showPublic: showPublic,
    feedContent: feedContent,
    feedLikes: feedLikes,
    allowModifications: AllowModifications,
  };

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

  return (
    <FeedDiv>
      <Header
        headerData={headerData}
        DeletePost={() => {
          ShowDeletePost(feedId);
        }}
        ShowEditPost={ShowEditPost}
      />
      <Body Content={feedContent} />
      <Footer
        footerData={footerData}
        DeletePost={() => {
          ShowDeletePost(feedId);
        }}
        ShowEditPost={ShowEditPost}
      />
    </FeedDiv>
  );
}
