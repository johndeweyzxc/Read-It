// Dependency imports
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// App imports
import Welcome from "./Welcome";
import LoginForm from "./LoginForm";
import { localIP } from "../../ip";

const AppMain = styled.div`
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
`;

const InvalidInput = styled.div`
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100vw;
  display: none;
  justify-content: flex-end;
`;

const ErrorOutput = styled.div`
  position: relative;
  margin: 2rem;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #fff;
  border: 1px solid #7c7c7c;
  border-radius: 3px;
  box-shadow: 0 0 1px #000;
  justify-self: center;
  align-self: flex-start;
  font-family: "JetBrains mono", sans-serif;
  color: #000;
`;

const AppHeader = styled.div`
  margin: 0;
  padding: 0;
  height: 15vh;
  width: 100vw;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.5);
  background-image: linear-gradient(to top, #ff512f, #dd2476);
  @media screen and (max-width: 600px) {
    height: 10vh;
  }
`;

const MainBody = styled.div`
  margin: 0;
  padding: 0;
  height: 85vh;
  width: 100vw;
  display: flex;
  @media screen and (max-width: 970px) {
    flex-direction: column;
  }
  @media screen and (max-width: 600px) {
    height: 95vh;
  }
`;

const AppFooter = styled.div`
  margin: 0;
  padding: 0;
  height: 25vh;
  width: 100vw;
  background-image: linear-gradient(to top, #ff512f, #dd2476);
  @media screen and (max-height: 500px) {
    display: none;
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();
  const invalidRef = useRef();
  const registerLocation = "/Register";
  const passwordResetLocation = "/PasswordReset";
  const home = "/Home";

  const TOKEN_ID = "tokenId";

  useEffect(() => {
    // Check if there exists a specific token on the local storage
    const storedToken = JSON.parse(localStorage.getItem(TOKEN_ID));
    if (storedToken) {
      navigate(home);
    }
  });

  // API post request to the server to login will happen here.
  const loginRequest = async () => {
    const apiServerLogin = `http://${localIP}:4000/Login`;
    let response;

    try {
      response = await fetch(apiServerLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: username.current.value,
          Password: password.current.value,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    if (response) {
      const result = await response.json();
      const token = result.message.token;

      if (response.status === 201) {
        // Store the token in the local storage, we will use this token for some authentication
        localStorage.setItem(TOKEN_ID, JSON.stringify(token));

        navigate(home);
      } else {
        invalidRef.current.style.display = "flex";
      }
    }
  };

  return (
    <AppMain>
      <InvalidInput ref={invalidRef}>
        <ErrorOutput>*Wrong Username or Password</ErrorOutput>
      </InvalidInput>
      <AppHeader />
      <MainBody>
        <Welcome />
        <LoginForm
          username={username}
          password={password}
          registerLocation={registerLocation}
          passResetLoc={passwordResetLocation}
          loginRequest={loginRequest}
        />
      </MainBody>
      <AppFooter />
    </AppMain>
  );
}
