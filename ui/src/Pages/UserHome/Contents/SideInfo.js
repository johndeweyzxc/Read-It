import React from "react";
import styled from "styled-components";
import DisplayPicture from "./Assets/dp-silhouette.jpg";

const SideInfoDiv = styled.div`
  margin: 0;
  padding: 0;
  margin-left: 2rem;
  margin-right: 2rem;
  margin-bottom: 1rem;
  border: 1px solid #999999c5;
  border-radius: 2px;
  height: 40vh;
  max-width: 20rem;
  min-width: 15rem;
  flex-grow: 3;
  background-color: #fff;
  box-shadow: 0 0 1px;
  &:hover {
    border: 1px solid #494949c5;
  }
  display: block;
  @media screen and (max-width: 880px) {
    display: none;
  }
`;

const HeaderProfile = styled.div`
  margin: 0;
  padding: 0;
  height: 35%;
  background-image: linear-gradient(to left, #ff512f, #dd2476);
`;

const ProfilePicture = styled.div`
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImagePicture = styled.img`
  margin: 0;
  padding: 0;
  aspect-ratio: 1;
  height: 4rem;
  border: 2px solid #1f93ff;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  margin: 0;
  padding: 0;
  margin-top: ${(props) => props.marginTop};
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  font-family: "JetBrains Mono", monospace;
`;

const UserInfoSection = styled.div`
  margin: 0;
  padding: 0;
`;

const FullnameInfo = styled.div`
  margin: 0;
  padding: 0;
  font-size: 1rem;
`;

const UsernameInfo = styled.div`
  margin: 0;
  padding: 0;
  font-size: 0.75rem;
  color: #6d6d6dcc;
  text-align: center;
`;

const InfoTitle = styled.div`
  margin: 0;
  padding: 0;
  font-size: 0.85rem;
`;

const InfoBody = styled.div`
  margin: 0;
  padding: 0;
  font-size: 0.75rem;
  color: #6d6d6dcc;
`;

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
      <UserInfoSection>
        <InfoTitle>Total Likes</InfoTitle>
        <InfoBody>{totalLikes}</InfoBody>
      </UserInfoSection>
    );
  };

  const CakeDay = () => {
    return (
      <UserInfoSection>
        <InfoTitle>Cake Day</InfoTitle>
        <InfoBody>{cakeDay}</InfoBody>
      </UserInfoSection>
    );
  };

  const Profile = () => {
    return (
      <HeaderProfile>
        <ProfilePicture>
          <ImagePicture src={DisplayPicture} />
        </ProfilePicture>
      </HeaderProfile>
    );
  };

  const Names = () => {
    return (
      <UserInfoSection>
        <FullnameInfo>{fullName}</FullnameInfo>
        <UsernameInfo>@{userName}</UsernameInfo>
      </UserInfoSection>
    );
  };

  return (
    <SideInfoDiv>
      <Profile />
      <UserInfo marginTop={"2.25rem"} justifyContent={"center"}>
        <Names />
      </UserInfo>
      <UserInfo marginTop={"1rem"} justifyContent={"space-around"}>
        <TotalLikes />
        <CakeDay />
      </UserInfo>
    </SideInfoDiv>
  );
}
