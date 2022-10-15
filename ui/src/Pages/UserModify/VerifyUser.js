import React from "react";
import styled from "styled-components";

const VerifyUserDiv = styled.div`
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: none;
  justify-content: center;
  align-items: center;
  font-family: "JetBrains mono", monospace;
`;

const VerifyForm = styled.div`
  padding: 2rem;
  border: 1px solid #7c7c7c;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 1px;
  background-color: #fff;
  @media screen and (max-width: 420px) {
    padding: 1rem;
  }
`;

const FormInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormInputLabel = styled.div`
  margin-bottom: 0.25rem;
  font-size: 1rem;
  @media screen and (max-width: 420px) {
    font-size: 0.8rem;
  }
`;

const FormInputText = styled.input`
  padding: 0.5rem;
  width: 25vw;
  @media screen and (max-width: 1000px) {
    width: 40vw;
  }
  @media screen and (max-width: 700px) {
    width: 50vw;
  }
  @media screen and (max-width: 420px) {
    width: 70vw;
    font-size: 0.8rem;
  }
  margin-bottom: 1rem;
  border: 1px solid #eb4141;
  border-radius: 0.5rem;
  outline: none;
  font-size: 1.25rem;
  font-family: "JetBrains mono", monospace;
`;

const FormButtonDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const FormButtons = styled.button`
  margin-top: 1rem;
  padding: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  align-self: center;
  font-size: 1rem;
  @media screen and (max-width: 420px) {
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }
  font-family: "JetBrains Mono", monospace;
  letter-spacing: 1px;
  background-color: #eb4141;
  border: 1px solid #eb4141;
  border-radius: 0.5rem;
  color: #fff;
  &:hover {
    cursor: pointer;
  }
`;

export default function VerifyUser({
  verifyUser,
  verifyUsername,
  verifyPassword,
  sendUpdate,
  showUpdateView,
}) {
  return (
    <VerifyUserDiv ref={verifyUser}>
      <VerifyForm>
        <FormInputDiv>
          <FormInputLabel>Current username:</FormInputLabel>
          <FormInputText
            ref={verifyUsername}
            type={"text"}
            placeholder={"Username"}
          />
        </FormInputDiv>
        <FormInputDiv>
          <FormInputLabel>Current password:</FormInputLabel>
          <FormInputText
            ref={verifyPassword}
            type={"password"}
            placeholder={"Password"}
          />
        </FormInputDiv>
        <FormButtonDiv>
          <FormButtons type={"button"} onClick={showUpdateView}>
            Back
          </FormButtons>
          <FormButtons type={"button"} onClick={sendUpdate}>
            Update
          </FormButtons>
        </FormButtonDiv>
      </VerifyForm>
    </VerifyUserDiv>
  );
}
