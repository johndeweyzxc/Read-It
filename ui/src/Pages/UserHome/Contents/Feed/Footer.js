// Dependency imports
import React from "react";
import styled from "styled-components";
// App imports
import EditIcon from "../Assets/Edit-icon.png";
import TrashIcon from "../Assets/Trash-icon.png";

const FooterDiv = styled.div`
  padding: 0.5rem;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  justify-content: space-between;
  border-top: 1px solid #999999c5;
  font-family: "JetBrains mono", monospace;
`;

const FooterContainer = styled.div`
  margin-right: 0.5rem;
  align-self: center;
  display: flex;
  &:hover {
    color: #238aff;
  }
`;

const FooterIcon = styled.img`
  padding-right: 0.5rem;
  aspect-ratio: 1;
  height: 1rem;
  align-self: center;
  &:hover + ${FooterContainer} {
    color: #238aff;
  }
  @media screen and (max-width: 420px) {
    display: none;
  }
`;

const FooterText = styled(FooterContainer)`
  color: #2525259d;
  font-size: 0.8rem;
`;

const FooterTextModifications = styled(FooterText)`
  @media screen and (max-width: 420px) {
    display: none;
  }
`;

export default function Footer({ footerData, ShowEditPost, DeletePost }) {
  const feedId = footerData.feedId;
  const showPublic = footerData.showPublic;
  const feedContent = footerData.feedContent;
  const feedLikes = footerData.feedLikes;
  const allowModifications = footerData.allowModifications;

  let likeOrLikes = "Like";

  if (feedLikes > 1) {
    likeOrLikes = "Likes";
  }

  function FooterUpdateDelete() {
    const footerMods = (
      <FooterContainer>
        <FooterContainer
          onClick={() => {
            ShowEditPost(feedId, showPublic, feedContent);
          }}
        >
          <FooterIcon src={EditIcon} />
          <FooterTextModifications>Edit</FooterTextModifications>
        </FooterContainer>
        <FooterContainer
          onClick={() => {
            DeletePost(feedId);
          }}
        >
          <FooterIcon src={TrashIcon} />
          <FooterTextModifications>Delete</FooterTextModifications>
        </FooterContainer>
      </FooterContainer>
    );

    if (allowModifications) {
      return footerMods;
    } else {
      return null;
    }
  }

  return (
    <FooterDiv>
      <FooterText
        onClick={() => {
          alert("This feature is under development");
        }}
      >
        {feedLikes} {likeOrLikes}
      </FooterText>
      <FooterUpdateDelete />
    </FooterDiv>
  );
}
