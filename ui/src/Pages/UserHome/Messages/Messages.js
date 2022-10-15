// Dependency imports
import React from "react";
import styled from "styled-components";
// App imports
import MessageIcon from "./Assets/send-icon.png";

const MessagesDiv = styled.div`
  position: fixed;
  display: none;
  bottom: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 0 2px;
  font-family: "Noto Sans", monospace;
  z-index: 3;
`;

const MessageContents = styled.div`
  display: flex;
`;

const MessageLists = styled.div`
  width: 10vw;
  border: 1px solid #7c7c7c;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageView = styled.div``;

const CurrentMessages = styled.div`
  height: 50vh;
  border-top: 1px solid #7c7c7c;
  border-bottom: 1px solid #7c7c7c;
  border-right: 1px solid #7c7c7c;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MessageInput = styled.input`
  margin: 0.5rem;
  padding: 0.25rem;
  width: 30vw;
  outline: none;
  font-size: 1rem;
`;

export const MessageSend = styled.img`
  margin: 0.5rem;
  height: 1.75rem;
  aspect-ratio: 1;
  &:hover {
    cursor: pointer;
  }
`;

export default function Messages({ messagesRef }) {
  return (
    <MessagesDiv ref={messagesRef}>
      <MessageContents>
        <MessageLists>Message Lists</MessageLists>
        <MessageView>
          <CurrentMessages>
            No current messages (This feature is under development)
          </CurrentMessages>
          <InputDiv>
            <MessageInput type={"text"} placeholder={"Send a message"} />
            <MessageSend src={MessageIcon} />
          </InputDiv>
        </MessageView>
      </MessageContents>
    </MessagesDiv>
  );
}
