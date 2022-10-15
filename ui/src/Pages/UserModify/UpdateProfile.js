// Dependency imports
import { React, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// App imports
import VerifyUser from "./VerifyUser";
import {
  RegisterDiv,
  RegisterTitle,
  RegisterInputSection,
  RegisterInputDiv,
  RegisterInputs,
  RegisterLabel,
  RegisterButton,
} from "./Register";
import { localIP } from "../../Configs/IP_ADDR";

const UpdateProfileDiv = styled(RegisterDiv)``;

const UpdateProfileForm = styled.form`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const UpdateTitle = styled(RegisterTitle)``;
const ProfileInputSection = styled(RegisterInputSection)``;
const ProfileInputDiv = styled(RegisterInputDiv)``;

const ProfileInputs = styled(RegisterInputs)`
  border: 1px solid #eb4141;
  border-radius: 0.5rem;
  @media screen and (max-width: 820px) {
    width: 40vw;
  }
  @media screen and (max-width: 420px) {
    width: 80vw;
  }
`;

const ProfileLabel = styled(RegisterLabel)``;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const UpdateButton = styled(RegisterButton)``;

export default function UpdateProfile() {
  const navigate = useNavigate();
  const updateProfileRef = useRef();
  const verifyUserRef = useRef();

  // Reference to user inputs for updating info
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const birthDayRef = useRef();
  const userNameRef = useRef();
  const passWordRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const confirmPasswordRef = useRef();

  // Reference to user inputs for verifying
  const verifyUsernameRef = useRef();
  const verifyPasswordRef = useRef();

  const showVerify = () => {
    const profile = updateProfileRef.current.style;
    const verify = verifyUserRef.current.style;
    profile.filter = "blur(5px)";
    verify.position = "absolute";
    verify.display = "flex";
  };

  const showUpdateView = () => {
    const profile = updateProfileRef.current.style;
    const verify = verifyUserRef.current.style;
    profile.filter = "blur(0px)";
    verify.display = "none";
  };

  // API post request to the server will happen here
  const sendUpdate = async () => {
    const apiUpdateUser = `http://${localIP}:4000/UserUpdate`;

    let response;
    const currentUsername = verifyUsernameRef.current.value;
    const currentPassword = verifyPasswordRef.current.value;

    if (!(passWordRef.current.value === confirmPasswordRef.current.value)) {
      alert("Those passwords did not match");
      return;
    }

    const changes = {
      FirstName: firstNameRef.current.value,
      LastName: lastNameRef.current.value,
      UserName: userNameRef.current.value,
      BirthDay: birthDayRef.current.value,
      Email: emailRef.current.value,
      PhoneNumber: phoneRef.current.value,
      Password: passWordRef.current.value,
    };

    const updates = {
      UserNameVerify: currentUsername,
      PasswordVerify: currentPassword,
    };

    // Loop through changes object to check if input has a value
    Object.keys(changes).forEach((key) => {
      if (!(changes[key] === "")) {
        updates[key] = changes[key];
      }
    });

    // Checks if there is an update to the user profile
    if (Object.keys(updates).length - 2 === 0) {
      alert("No changes have been made");
      showUpdateView();
      return;
    }

    try {
      response = await fetch(apiUpdateUser, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
    } catch (error) {
      console.log(error);
    }

    if (response) {
      const result = await response.json();
      const message = result.message;
      const firstItem = Object.keys(message)[0];

      if (response.status === 401) {
        alert("Invalid username or password");
        showVerify();
      } else if (response.status === 400) {
        alert(message[firstItem]);
        showUpdateView();
      } else if (response.status === 500) {
        navigate("/ServerError");
      } else {
        alert("Successfully updated your profile");
        navigate("/Home");
      }
    }
  };

  return (
    <>
      <UpdateProfileDiv ref={updateProfileRef}>
        <UpdateTitle>Update your profile</UpdateTitle>
        <UpdateProfileForm>
          <ProfileInputSection>
            <ProfileInputDiv>
              <ProfileLabel>First Name: </ProfileLabel>
              <ProfileInputs
                ref={firstNameRef}
                type={"text"}
                placeholder={"John Dewey"}
              />
            </ProfileInputDiv>
            <ProfileInputDiv>
              <ProfileLabel>Last Name: </ProfileLabel>
              <ProfileInputs
                ref={lastNameRef}
                type={"text"}
                placeholder={"Altura"}
              />
            </ProfileInputDiv>
          </ProfileInputSection>

          <ProfileInputSection>
            <ProfileInputDiv>
              <ProfileLabel>Username: </ProfileLabel>
              <ProfileInputs
                ref={userNameRef}
                type={"text"}
                placeholder={"johndewey112"}
              />
            </ProfileInputDiv>
            <ProfileInputDiv>
              <ProfileLabel>Birthday: </ProfileLabel>
              <ProfileInputs ref={birthDayRef} type={"date"} />
            </ProfileInputDiv>
          </ProfileInputSection>

          <ProfileInputSection>
            <ProfileInputDiv>
              <ProfileLabel>Email: </ProfileLabel>
              <ProfileInputs
                ref={emailRef}
                type={"text"}
                placeholder={"johndewey22@gmail.com"}
              />
            </ProfileInputDiv>
            <ProfileInputDiv>
              <ProfileLabel>Phone Number: </ProfileLabel>
              <ProfileInputs
                ref={phoneRef}
                type={"text"}
                placeholder="09993241123"
              />
            </ProfileInputDiv>
          </ProfileInputSection>

          <ProfileInputSection>
            <ProfileInputDiv>
              <ProfileLabel>Password: </ProfileLabel>
              <ProfileInputs
                ref={passWordRef}
                type={"password"}
                placeholder={"New Password"}
              />
            </ProfileInputDiv>
            <ProfileInputDiv>
              <ProfileLabel>Confirm Password: </ProfileLabel>
              <ProfileInputs
                ref={confirmPasswordRef}
                type={"password"}
                placeholder={"Confirm New Password"}
              />
            </ProfileInputDiv>
          </ProfileInputSection>
          <ButtonDiv>
            <UpdateButton
              type={"button"}
              onClick={() => {
                navigate("/Home");
              }}
            >
              Back
            </UpdateButton>
            <UpdateButton type={"button"} onClick={showVerify}>
              Next
            </UpdateButton>
          </ButtonDiv>
        </UpdateProfileForm>
      </UpdateProfileDiv>
      <VerifyUser
        verifyUser={verifyUserRef}
        verifyUsername={verifyUsernameRef}
        verifyPassword={verifyPasswordRef}
        sendUpdate={sendUpdate}
        showUpdateView={showUpdateView}
      />
    </>
  );
}
