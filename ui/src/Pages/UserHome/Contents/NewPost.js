// Dependency imports
import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
// App imports

export const NewPostDiv = styled.div`
  margin: 0;
  margin-bottom: 1rem;
  border: 1px solid #999999c5;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 0 1px;
  font-family: "JetBrains mono", monospace;
`;

export const Header = styled.div`
  margin: 0;
  padding: 0.5rem;
  display: flex;
`;

export const Title = styled.div`
  margin: 0;
  padding: 0;
  color: #000;
  font-size: 1.15rem;
  @media screen and (max-width: 700px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 400px) {
    font-size: 0.9rem;
  }
`;

export const TextAreaDiv = styled.div`
  margin: 0;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  display: flex;
`;

export const TextArea = styled.textarea`
  margin: 0;
  padding: 5px;
  resize: none;
  outline: none;
  flex-grow: 1;
  font-size: 1rem;
  font-family: "JetBrains mono", monospace;
  background-color: #fff;
  @media screen and (max-width: 700px) {
    font-size: 0.9rem;
  }
`;

export const Footer = styled.div`
  margin: 0;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

export const SubmitPost = styled.button`
  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  letter-spacing: 1px;
  background-image: linear-gradient(to left, #ff512f, #dd2476);
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 0.9rem;
  @media screen and (max-width: 400px) {
    padding: 0.25rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    font-size: 0.8rem;
  }
  font-family: "JetBrains mono", monospace;
  &:hover {
    cursor: pointer;
    background-image: linear-gradient(to left, #dd2476, #ff512f);
  }
`;

export const SwitchName = styled.span`
  margin: 0;
  padding: 0;
  margin-right: 0.5rem;
  letter-spacing: 1px;
  font-size: 0.9rem;
  @media screen and (max-width: 400px) {
    font-size: 0.8rem;
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Switch = styled.div`
  position: relative;
  width: calc(3rem - 5px);
  height: calc(1.5rem - 5px);
  @media screen and (max-width: 400px) {
    width: 2.5rem;
    height: 1rem;
  }
  background: #b3b3b3;
  border-radius: calc(1.5rem - 5px);
  padding: 4px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: "";
    position: absolute;
    width: calc(1.5rem - 5px);
    height: calc(1.5rem - 5px);
    @media screen and (max-width: 400px) {
      width: 1rem;
      height: 1rem;
    }
    border-radius: 2rem;
    top: 50%;
    left: 4px;
    background: #fff;
    transform: translate(0, -50%);
  }
`;

export const Input = styled.input`
  display: none;
  &:checked + ${Switch} {
    background-image: linear-gradient(to left, #dd2476, #ff512f);
    &:before {
      transform: translate(1.5rem, -50%);
    }
  }
`;

export default function NewPost({setFeedList}) {
  const navigate = useNavigate();
  const TOKEN_ID = "tokenId";
  const textInputRef = useRef();
  let onGoingRequest = false;
  let defaultVal = false;

  // Creates new post and sends to the backend server api
  const createNewPost = async () => {
    if (onGoingRequest === true) {
      // This checks if the post request is still processing
      alert("There is an on going post request. Please wait...");
      return;
    }

    const storedToken = JSON.parse(localStorage.getItem(TOKEN_ID));
    const apiServerCreatePost = `http://${process.env.REST_IP}:4000/CreatePost`;
    let response;
    onGoingRequest = true;

    let textContent = textInputRef.current.value;
    if (!storedToken) {
      navigate("/");
    }

    try {
      response = await fetch(apiServerCreatePost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TokenId: storedToken,
          PostContent: textContent,
          ShowPublic: defaultVal,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    if (response) {
      textInputRef.current.value = null;
      const result = await response.json();
      const message = result.message;
      const firstMessage = Object.keys(message)[0];

      // This checks if there is an error on user inputs
      if (response.status === 400) {
        alert(message[firstMessage]);
      }
      // Invalid token or the user is not logged in
      else if (response.status === 401) {
        alert(message);
        navigate("/");
      } else if (response.status === 500) {
        navigate("/ServerError");
      }
      // The user successfully create a new post
      else {
        let newPost = message;
        setFeedList((current) => {
          return [newPost, ...current];
        });
        alert("You created a new post!");
        onGoingRequest = false;
      }
    }
  };

  // This toggle the switch animation to indicate on state or off state.
  const ToggleSwitch = () => {
    return (
      <Label>
        <SwitchName>Public</SwitchName>
        <Input
          type={"checkbox"}
          onChange={() => {
            defaultVal = defaultVal ? false : true;
          }}
        />
        <Switch />
      </Label>
    );
  };

  return (
    <NewPostDiv>
      <Header>
        <Title>Create New Post</Title>
      </Header>
      <TextAreaDiv>
        <TextArea ref={textInputRef} />
      </TextAreaDiv>
      <Footer>
        <ToggleSwitch />
        <SubmitPost type={"button"} onClick={createNewPost}>
          Submit
        </SubmitPost>
      </Footer>
    </NewPostDiv>
  );
}
