import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";

import "./styles.css";
import {localIP} from "../../ip";

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

  const VerifyUser = () => {
    return (
      <div className='Verify-UserDiv' ref={verifyUserRef}>
        <div className='Verify-Form'>
          <div className='flex flex-col'>
            <label className='Verify-Label'>Current username: </label>
            <input
              className='Verify-Input'
              ref={verifyUsernameRef}
              type={"text"}
              placeholder={"Username"}
            />
          </div>

          <div className='flex flex-col'>
            <label className='Verify-Label'>Current password: </label>
            <input
              className='Verify-Input'
              ref={verifyPasswordRef}
              type={"password"}
              placeholder={"Password"}
            />
          </div>

          <div className='flex justify-evenly'>
            <button
              className='Verify-Button'
              type={"button"}
              onClick={showUpdateView}
            >
              Back
            </button>
            <button
              className='Verify-Button'
              type={"button"}
              onClick={sendUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className='w-screen h-screen tablet:h-auto 
        flex flex-col justify-center'
        ref={updateProfileRef}
      >
        <div
          className='mt-8 mb-8 pl-8 pr-8 pb-2 text-3xl
          font-JetBrains self-center border-b-[1px] border-solid
          border-black phone:text-xl'
        >
          Update your profile
        </div>

        <form className='flex flex-col self-center'>
          <div className='flex tablet:flex-col'>
            <div className='flex flex-col ml-2 mr-4'>
              <label className='Register-Label'>First Name: </label>
              <input
                className='Register-Input'
                ref={firstNameRef}
                type={"text"}
                placeholder={"John Dewey"}
              />
            </div>

            <div className='flex flex-col ml-2 mr-4'>
              <label className='Register-Label'>Last Name: </label>
              <input
                className='Register-Input'
                ref={lastNameRef}
                type={"text"}
                placeholder={"Ventura"}
              />
            </div>
          </div>

          <div className='flex tablet:flex-col'>
            <div className='flex flex-col ml-2 mr-4'>
              <label className='Register-Label'>Username: </label>
              <input
                className='Register-Input'
                ref={userNameRef}
                type={"text"}
                placeholder={"johndewey112"}
              />
            </div>

            <div className='flex flex-col ml-2 mr-4'>
              <label className='Register-Label'>Birthday: </label>
              <input
                className='Register-Input'
                ref={birthDayRef}
                type={"date"}
              />
            </div>
          </div>

          <div className='flex tablet:flex-col'>
            <div className='flex flex-col ml-2 mr-4'>
              <label className='Register-Label'>Email: </label>
              <input
                className='Register-Input'
                ref={emailRef}
                type={"text"}
                placeholder={"johndewey22@gmail.com"}
              />
            </div>

            <div className='flex flex-col ml-2 mr-4'>
              <label className='Register-Label'>Phone Number: </label>
              <input
                className='Register-Input'
                ref={phoneRef}
                type={"text"}
                placeholder={"09993241123"}
              />
            </div>
          </div>

          <div className='flex tablet:flex-col'>
            <div className='flex flex-col ml-2 mr-4'>
              <label className='Register-Label'>Password: </label>
              <input
                className='Register-Input'
                ref={passWordRef}
                type={"password"}
                placeholder={"New Password"}
              />
            </div>
            <div className='flex flex-col ml-2 mr-4'>
              <label className='Register-Label'>Confirm Password: </label>
              <input
                className='Register-Input'
                ref={confirmPasswordRef}
                type={"password"}
                placeholder={"Confirm New Password"}
              />
            </div>
          </div>

          <div className='w-full flex justify-evenly'>
            <button
              className='Register-Button'
              type={"button"}
              onClick={() => navigate("/Home")}
            >
              Back
            </button>
            <button
              className='Register-Button'
              type={"button"}
              onClick={showVerify}
            >
              Next
            </button>
          </div>
        </form>
      </div>
      <VerifyUser />
    </>
  );
}
