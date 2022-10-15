import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginFormParent = styled.div`
  margin: 0;
  padding: 0;
  height: 85vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 970px) {
    margin-top: 2rem;
    align-items: flex-start;
  }
`;

const LoginFormInput = styled.form`
  margin: 0;
  padding: 2rem;
  border: 1px solid #7c7c7c;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 3px;
`;

const LoginFormTextBox = styled.input`
  margin: 0;
  width: 25vw;
  margin-bottom: ${(props) => props.marginBottom};
  border: 2px solid #eb4141;
  border-radius: 0.5rem;
  padding: 0.55rem;
  outline: none;
  font-size: 1.25rem;
  font-family: "JetBrains Mono", monospace;
  @media screen and (max-width: 970px) {
    width: 40vw;
    font-size: 1rem;
  }
  @media screen and (max-width: 600px) {
    width: 60vw;
  }
`;

const LoginFormHr = styled.hr`
  margin: 0;
  padding: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const LoginFormForgot = styled.div`
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1rem;
  font-family: "JetBrains Mono", monospace;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 970px) {
    font-size: 0.8rem;
  }
`;

const LoginFormButton = styled.button`
  margin: 0;
  padding: 0.5rem;
  width: 70%;
  font-size: 1rem;
  font-family: "JetBrains Mono", monospace;
  font-weight: ${(props) => props.fontWeight};
  letter-spacing: 1px;
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => props.boxBorder};
  border-radius: 0.5rem;
  color: #fff;
  align-self: center;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 2px;
  }
  @media screen and (max-width: 970px) {
    font-size: 0.8rem;
  }
  @media screen and (max-width: 400px) {
    width: 80%;
  }
`;

export default function LoginForm({
  username,
  password,
  loginRequest,
  registerLocation,
  passResetLoc,
}) {
  const navigate = useNavigate();

  return (
    <LoginFormParent>
      <LoginFormInput>
        <LoginFormTextBox
          name={"userName"}
          type={"text"}
          marginBottom={"1rem"}
          placeholder="Username"
          ref={username}
        />
        <LoginFormTextBox
          name={"passWord"}
          type={"password"}
          marginBottom={"0.5rem"}
          placeholder="Password"
          ref={password}
        />

        <LoginFormForgot
          onClick={() => {
            navigate(passResetLoc);
          }}
        >
          Forgot your password?
        </LoginFormForgot>
        <LoginFormButton
          type={"button"}
          onClick={loginRequest}
          backgroundColor={"#eb4141"}
          boxBorder={"1px solid #eb4141"}
          fontWeight={"600"}
        >
          Login
        </LoginFormButton>
        <LoginFormHr></LoginFormHr>
        <LoginFormButton
          type={"button"}
          onClick={() => {
            navigate(registerLocation);
          }}
          backgroundColor={"#000"}
          boxBorder={"1px solid #000"}
          fontWeight={"medium"}
        >
          Create New Account
        </LoginFormButton>
      </LoginFormInput>
    </LoginFormParent>
  );
}
