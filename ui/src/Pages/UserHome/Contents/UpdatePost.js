// Dependency imports
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// App imports
import { localIP } from "../../../ip";
import {
  Header,
  Title,
  TextAreaDiv,
  TextArea,
  Footer,
  SubmitPost,
  Label,
  Switch,
  Input,
  SwitchName,
} from "./NewPost";

export const EditPostDiv = styled.div`
  border: 1px solid #999999c5;
  border-radius: 2px;
  box-shadow: 0 0 1px;
  background: #fff;
`;

const LabelDiv = styled(Label)`
  margin-right: 1rem;
  @media screen and (max-width: 700px) {
    margin-right: 0.8rem;
  }
`;

export const SubmitUpdates = styled(SubmitPost)`
  margin-right: 1rem;
  @media screen and (max-width: 700px) {
    margin-right: 0.8rem;
    font-size: 0.7rem;
  }
`;
const UpdateTextArea = styled(TextArea)`
  width: 50vw;
  @media screen and (max-width: 1000px) {
    width: 70vw;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export default function UpdatePost({
  updateInfo,
  FeedList,
  setFeedList,
  CancelEditPost,
}) {
  const navigate = useNavigate();
  const TOKEN_ID = "tokenId";
  let onGoingRequest = false;

  let postId = updateInfo.postId;
  // Old value of the post data
  let isPublic = updateInfo.isPublic;
  let content = updateInfo.content;

  // This are the variable for the updates on the post.
  let textAreaRef = useRef();
  let switchVal = isPublic;

  // Updates the post in the UI, effect happens only in client side.
  const UpdateUI = () => {
    const currentPost = [...FeedList];
    const post = currentPost.find((post) => post._id === postId);
    post.Content = textAreaRef.current.value;
    post.ShowPublic = switchVal;
    setFeedList(currentPost);
    CancelEditPost();
  };

  // Updates the post data on the database and on the UI.
  const UpdateUIAndDataBase = async () => {
    // This checks if the update request is still processing
    if (onGoingRequest === true) {
      alert("There is an on going update request. Please wait...");
      return;
    }

    const storedToken = JSON.parse(localStorage.getItem(TOKEN_ID));
    const apiServerUpdatePost = `http://${localIP}:4000/UpdatePost`;
    let response;
    onGoingRequest = true;

    if (!storedToken) {
      navigate("/");
      onGoingRequest = false;
      return;
    }

    let newContent = textAreaRef.current.value;
    let newSwitchValue = switchVal;

    // If no changes have been made to the post
    if (newContent === content && newSwitchValue === isPublic) {
      alert("No changes have been made to the post");
      onGoingRequest = false;
      CancelEditPost();
      return;
    }

    try {
      response = await fetch(apiServerUpdatePost, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          PostId: postId,
          TokenId: storedToken,
          NewContent: textAreaRef.current.value,
          ShowPublic: switchVal,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    if (response) {
      const result = await response.json();
      const message = result.message;

      // This checks if there is an invalid post id or invalid token id or unauthorized update.
      if (response.status === 400 || response.status === 401) {
        alert(message);
        navigate("/");
      } else if (response.status === 500) {
        navigate("/ServerError");
      }
      // The user successfully deleted a post
      else {
        // Update the UI
        UpdateUI();
        alert(message);
      }
    }
  };

  // This toggle the switch animation to indicate on state or off state.
  const ToggleSwitch = () => {
    return (
      <LabelDiv>
        <SwitchName>Public</SwitchName>
        <Input
          type={"checkbox"}
          onChange={() => {
            switchVal = switchVal ? false : true;
          }}
          defaultChecked={isPublic}
        />
        <Switch />
      </LabelDiv>
    );
  };

  return (
    <>
      <EditPostDiv>
        <Header>
          <Title>Edit this Post</Title>
        </Header>
        <TextAreaDiv>
          <UpdateTextArea defaultValue={content} ref={textAreaRef} />
        </TextAreaDiv>
        <Footer>
          <ToggleSwitch />
          <ButtonContainer>
            <SubmitUpdates type={"button"} onClick={CancelEditPost}>
              Cancel
            </SubmitUpdates>
            <SubmitUpdates type={"button"} onClick={UpdateUIAndDataBase}>
              Update
            </SubmitUpdates>
          </ButtonContainer>
        </Footer>
      </EditPostDiv>
    </>
  );
}
