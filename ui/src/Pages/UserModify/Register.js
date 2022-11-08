import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";

import "./styles.css";
import {localIP} from "../../ip";

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
    <div
      className='w-screen h-screen tablet:h-auto flex flex-col
    justify-center'
    >
      <div
        className='mt-8 mb-8 pl-8 pr-8 pb-2 text-3xl text-JetBrains 
      self-center border-b-[1px] border-solid border-black'
      >
        Create A New Account
      </div>

      <div
        className='w-screen h-screen tablet:h-auto flex flex-col
      justify-center items-center'
      >
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
            <input className='Register-Input' ref={birthDayRef} type={"date"} />
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

        <button className='Register-Button' type={"button"} onClick={sendForm}>
          Register
        </button>
      </div>
    </div>
  );
}
