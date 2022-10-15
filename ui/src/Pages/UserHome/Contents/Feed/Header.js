// Dependency imports
import React from "react";
import styled from "styled-components";
// App imports
import GlobeIcon from "../Assets/Globe-icon.png";
import LockIcon from "../Assets/Lock-icon.png";
import EditIcon from "../Assets/Edit-icon.png";
import TrashIcon from "../Assets/Trash-icon.png";

const HeaderDiv = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.25rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #999999c5;
  font-family: "JetBrains mono", monospace;
`;

const HeaderInfo = styled.div`
  display: flex;
  @media screen and (max-width: 720px) {
    flex-direction: column;
  }
`;

const HeaderUDDiv = styled(HeaderInfo)`
  display: none;
  align-self: center;
  @media screen and (max-width: 420px) {
    flex-direction: row;
    display: flex;
  }
`;

const HeaderIcon = styled.img`
  margin-right: 0.5rem;
  aspect-ratio: 1;
  height: 1rem;
  align-self: center;
  @media screen and (max-width: 740px) {
    display: none;
  }
`;

const HeaderUDIcon = styled(HeaderIcon)`
  display: none;
  @media screen and (max-width: 420px) {
    display: block;
  }
`;

const MobileIcon = styled(HeaderIcon)`
  align-self: center;
  display: none;
  @media screen and (max-width: 740px) {
    display: block;
  }
`;

const HeaderText = styled.div`
  margin-right: 0.5rem;
  color: #2525259d;
  font-size: 0.8rem;
  align-self: center;
  text-decoration: ${(props) => props.textDecoration};
  @media screen and (max-width: 720px) {
    align-self: flex-start;
  }
`;

const HeaderUDText = styled(HeaderText)`
  font-size: 0.7rem;
  display: block;
`;

const FullNameText = styled.div`
  margin-right: 0.5rem;
  color: #000;
  font-size: 1rem;
  align-self: center;
  @media screen and (max-width: 720px) {
    font-size: 0.8rem;
  }
`;

const InterpunctDiv = styled.div`
  display: flex;
`;

const Interpunct = styled.div`
  color: #2525259d;
  @media screen and (max-width: 740px) {
    display: none;
  }
`;

const MobileInterpunct = styled(Interpunct)`
  align-self: center;
  display: none;
  @media screen and (max-width: 740px) {
    display: block;
  }
`;
const HeaderDateDiv = styled.div`
  display: flex;
  @media screen and (max-width: 420px) {
    display: none;
  }
`;

const HeaderDateContent = styled.div`
  display: flex;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    margin-right: ${(props) => props.marginRight};
  }
`;

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
      <HeaderUDDiv>
        <HeaderUDDiv
          onClick={() => {
            ShowEditPost(feedId, showPublic, feedContent);
          }}
        >
          <HeaderUDIcon src={EditIcon} />
          <HeaderUDText>Edit</HeaderUDText>
        </HeaderUDDiv>

        <HeaderUDDiv
          onClick={() => {
            DeletePost(feedId);
          }}
        >
          <HeaderUDIcon src={TrashIcon} />
          <HeaderUDText>Delete</HeaderUDText>
        </HeaderUDDiv>
      </HeaderUDDiv>
    );

    if (allowModifications) {
      return headerMods;
    } else {
      return null;
    }
  }

  return (
    <HeaderDiv>
      <HeaderInfo>
        <InterpunctDiv>
          <FullNameText>{FullName}</FullNameText>
          <MobileInterpunct>·</MobileInterpunct>
          <MobileIcon src={showPublic ? GlobeIcon : LockIcon} />
        </InterpunctDiv>

        <HeaderText textDecoration={"underline"}>@{UserName}</HeaderText>
        <Interpunct>·</Interpunct>
        <HeaderIcon src={showPublic ? GlobeIcon : LockIcon} />
      </HeaderInfo>

      <HeaderDateDiv>
        <HeaderDateContent marginRight={"1rem"}>
          <HeaderText>Posted on</HeaderText>
          <HeaderText>{feedPostedAt}</HeaderText>
        </HeaderDateContent>

        <HeaderDateContent>
          <HeaderText>Edited on</HeaderText>
          <HeaderText>{feedUpdatedAt}</HeaderText>
        </HeaderDateContent>
      </HeaderDateDiv>
      <HeaderUpdateDelete />
    </HeaderDiv>
  );
}
