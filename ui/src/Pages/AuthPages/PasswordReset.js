import React from "react";
import styled from "styled-components";

const PasswordResetDiv = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  @media screen and (max-width: 600px) {
    height: auto;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Form = styled.form`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  margin: 0;
  padding: 0;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 0.5rem;
  font-size: 1.75rem;
  @media screen and (max-width: 400px) {
    font-size: 1.25rem;
  }
  font-family: "JetBrains mono", monospace;
  border-bottom: 1px solid #000;
`;

const InputSection = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const InputDiv = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
  margin-right: 1rem;
`;

const Inputs = styled.input`
  margin: 0;
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 25vw;
  font-size: 1.25rem;
  @media screen and (max-width: 1000px) {
    font-size: 1rem;
    width: 30vw;
  }
  @media screen and (max-width: 700px) {
    width: 35vw;
  }
  @media screen and (max-width: 600px) {
    width: 70vw;
  }
  border: none;
  border-bottom: 1px solid #eb4141;
  font-family: "JetBrains mono", monospace;
  outline: none;
`;

const Label = styled.label`
  margin: 0;
  padding: 0;
  margin-bottom: 0.25rem;
  font-size: 1rem;
  font-family: "JetBrains mono", monospace;
`;

const VerifyButton = styled.button`
  margin: 0;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  font-family: "JetBrains mono", monospace;
  font-size: 1rem;
  letter-spacing: 1px;
  background-color: #eb4141;
  border: 1px solid #eb4141;
  border-radius: 0.5rem;
  color: #fff;
  &:hover {
    cursor: pointer;
  }
`;

export default function PasswordReset() {
  return (
    <PasswordResetDiv>
      <Form>
        <Title>Reset your Password</Title>
        <InputSection>
          <InputDiv>
            <Label>Email: </Label>
            <Inputs type={"text"} placeholder={"johndewey22@gmail.com"} />
          </InputDiv>
          <InputDiv>
            <Label>Email OTP: </Label>
            <Inputs type={"text"} placeholder={"OTP Code"} />
          </InputDiv>
        </InputSection>

        <InputSection>
          <InputDiv>
            <Label>Phone Number: </Label>
            <Inputs type={"text"} placeholder={"09993241123"} />
          </InputDiv>
          <InputDiv>
            <Label>Phone Number OTP: </Label>
            <Inputs type={"text"} placeholder={"OTP Code"} />
          </InputDiv>
        </InputSection>
        <VerifyButton
          type={"button"}
          onClick={() => {
            alert("This feature is under development");
          }}
        >
          Verify
        </VerifyButton>
      </Form>
    </PasswordResetDiv>
  );
}
