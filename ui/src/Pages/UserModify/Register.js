// Dependency imports
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// App imports
import { localIP } from "../../ip";
import {
  RegisterDiv,
  RegisterTitle,
  RegisterInputSection,
  RegisterInputDiv,
  RegisterInputs,
  RegisterLabel,
  RegisterButton,
} from "./GeneralStyles";

const RegisterForm = styled(RegisterDiv)`
  align-items: center;
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
