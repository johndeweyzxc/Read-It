// Dependency imports
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// App imports
import { localIP } from "../../Configs/IP_ADDR";

export const RegisterDiv = styled.div`
  width: 100vw;
  height: 100vh;
  @media screen and (max-width: 600px) {
    height: auto;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RegisterForm = styled(RegisterDiv)`
  align-items: center;
`;

export const RegisterTitle = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 0.5rem;
  font-size: 1.75rem;
  font-family: "JetBrains mono", monospace;
  align-self: center;
  border-bottom: 1px solid #000;
  @media screen and (max-width: 400px) {
    font-size: 1.25rem;
  }
`;

export const RegisterInputSection = styled.div`
  display: flex;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const RegisterInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
  margin-right: 1rem;
`;

export const RegisterInputs = styled.input`
  padding: 0.5rem;
  width: 25vw;
  margin-bottom: 1rem;
  border: none;
  border-bottom: 1px solid #eb4141;
  outline: none;
  font-size: 1.25rem;
  font-family: "JetBrains Mono", monospace;
  @media screen and (max-width: 600px) {
    width: 70vw;
  }
  @media screen and (max-width: 400px) {
    font-size: 1rem;
  }
`;

export const RegisterLabel = styled.label`
  margin-bottom: 0.25rem;
  font-size: 1rem;
  font-family: "JetBrains mono", monospace;
`;

export const RegisterButton = styled.button`
  margin-top: 1rem;
  margin-bottom: 2rem;
  padding: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  align-self: center;
  font-size: 1rem;
  @media screen and (max-width: 400px) {
    font-size: 0.9rem;
  }
  font-family: "JetBrains mono", monospace;
  letter-spacing: 1px;
  background-color: #eb4141;
  border: 1px solid #eb4141;
  border-radius: 0.5rem;
  color: #fff;
  &:hover {
    cursor: pointer;
  }
`;

export default function Register() {
  const navigate = useNavigate();

  const TOKEN_ID = "tokenId";

  // Reference to user inputs
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const birthDayRef = useRef();
  const userNameRef = useRef();
  const passWordRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const confirmPasswordRef = useRef();

  // API post request to the server will happen here
  const sendForm = async () => {
    const apiServerRegister = `http://${localIP}:4000/Register`;

    let response;

    if (!(passWordRef.current.value === confirmPasswordRef.current.value)) {
      alert("Those passwords did not match");
      return;
    }

    try {
      response = await fetch(apiServerRegister, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FirstName: firstNameRef.current.value,
          LastName: lastNameRef.current.value,
          Birthday: birthDayRef.current.value,
          UserName: userNameRef.current.value,
          Password: passWordRef.current.value,
          Email: emailRef.current.value,
          PhoneNumber: phoneRef.current.value,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    if (response) {
      const result = await response.json();
      const message = result.message;
      const firstItem = Object.keys(message)[0];

      // This checks if there is an error on user inputs
      if (response.status === 400 || response.status === 401) {
        alert(message[firstItem]);
      } else if (response.status === 500) {
        navigate("/ServerError");
      } else {
        // Store token received from the server in the local storage
        localStorage.setItem(TOKEN_ID, JSON.stringify(message[firstItem]));
        navigate("/Home");
      }
    }
  };

  return (
    <>
      <RegisterDiv>
        <RegisterTitle>Create a New Account</RegisterTitle>
        <RegisterForm>
          <RegisterInputSection>
            <RegisterInputDiv>
              <RegisterLabel>First Name: </RegisterLabel>
              <RegisterInputs
                ref={firstNameRef}
                type={"text"}
                placeholder={"John Dewey"}
              />
            </RegisterInputDiv>
            <RegisterInputDiv>
              <RegisterLabel>Last Name: </RegisterLabel>
              <RegisterInputs
                ref={lastNameRef}
                type={"text"}
                placeholder={"Altura"}
              />
            </RegisterInputDiv>
          </RegisterInputSection>

          <RegisterInputSection>
            <RegisterInputDiv>
              <RegisterLabel>Username: </RegisterLabel>
              <RegisterInputs
                ref={userNameRef}
                type={"text"}
                placeholder={"johndewey112"}
              />
            </RegisterInputDiv>
            <RegisterInputDiv>
              <RegisterLabel>Birthday: </RegisterLabel>
              <RegisterInputs ref={birthDayRef} type={"date"} />
            </RegisterInputDiv>
          </RegisterInputSection>

          <RegisterInputSection>
            <RegisterInputDiv>
              <RegisterLabel>Email: </RegisterLabel>
              <RegisterInputs
                ref={emailRef}
                type={"text"}
                placeholder={"johndewey22@gmail.com"}
              />
            </RegisterInputDiv>
            <RegisterInputDiv>
              <RegisterLabel>Phone Number: </RegisterLabel>
              <RegisterInputs
                ref={phoneRef}
                type={"text"}
                placeholder="09993241123"
              />
            </RegisterInputDiv>
          </RegisterInputSection>

          <RegisterInputSection>
            <RegisterInputDiv>
              <RegisterLabel>Password: </RegisterLabel>
              <RegisterInputs
                ref={passWordRef}
                type={"password"}
                placeholder={"New Password"}
              />
            </RegisterInputDiv>
            <RegisterInputDiv>
              <RegisterLabel>Confirm Password: </RegisterLabel>
              <RegisterInputs
                ref={confirmPasswordRef}
                type={"password"}
                placeholder={"Confirm New Password"}
              />
            </RegisterInputDiv>
          </RegisterInputSection>

          <RegisterButton type={"button"} onClick={sendForm}>
            Register
          </RegisterButton>
        </RegisterForm>
      </RegisterDiv>
    </>
  );
}
