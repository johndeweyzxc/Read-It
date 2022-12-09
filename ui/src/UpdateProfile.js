import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import "./Styles/register.css";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const updateProfileRef = useRef();
  const verifyUserRef = useRef();

  // Reference to user inputs for updating info
  const fname = useRef();
  const lname = useRef();
  const bday = useRef();
  const uname = useRef();
  const pword = useRef();
  const email = useRef();
  const phone = useRef();
  const confirmPword = useRef();

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
    let response;

    if (!(pword.current.value === confirmPword.current.value)) {
      alert("Those passwords did not match");
      return;
    }

    const changes = {
      FirstName: fname.current.value,
      LastName: lname.current.value,
      UserName: uname.current.value,
      BirthDay: bday.current.value,
      Email: email.current.value,
      PhoneNumber: phone.current.value,
      Password: pword.current.value,
    };

    const updates = {
      UserNameVerify: verifyUsernameRef.current.value,
      PasswordVerify: verifyPasswordRef.current.value,
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
      response = await fetch(`http://${process.env.REACT_APP_REST_IP}:4000/UserUpdate`, {
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

  function RegisterInputs() {
    const ListInputs = [
      [
        { Label: "First Name: ", Ref: fname, Type: "text", Pholder: "Your first name" },
        { Label: "Last Name: ", Ref: lname, Type: "text", Pholder: "Your last name" },
      ],
      [
        { Label: "Username: ", Ref: uname, Type: "text", Pholder: "Unique username" },
        { Label: "Birthday: ", Ref: bday, Type: "date", Pholder: null },
      ],
      [
        { Label: "Email: ", Ref: email, Type: "text", Pholder: "Email" },
        { Label: "Phone Number: ", Ref: phone, Type: "text", Pholder: "Phone number" },
      ],
      [
        { Label: "Password: ", Ref: pword, Type: "password", Pholder: "8 character password" },
        {
          Label: "Confirm Password: ",
          Ref: confirmPword,
          Type: "password",
          Pholder: "Confirm your password",
        },
      ],
    ];
    return ListInputs.map((inputs) => (
      <div key={uuidv4()} className="flex tablet:flex-col">
        {inputs.map((data) => (
          <div key={uuidv4()} className="flex flex-col ml-2 mr-4">
            <label className="Register-Label">{data.Label}</label>
            <input
              className="Register-Input"
              ref={data.Ref}
              type={data.Type}
              placeholder={data.Pholder}
            />
          </div>
        ))}
      </div>
    ));
  }

  const VerifyUser = () => {
    return (
      <div className="Verify-UserDiv" ref={verifyUserRef}>
        <div className="Verify-Form">
          <div className="flex flex-col">
            <label className="Verify-Label">Current username: </label>
            <input
              className="Verify-Input"
              ref={verifyUsernameRef}
              type={"text"}
              placeholder={"Username"}
            />
          </div>

          <div className="flex flex-col">
            <label className="Verify-Label">Current password: </label>
            <input
              className="Verify-Input"
              ref={verifyPasswordRef}
              type={"password"}
              placeholder={"Password"}
            />
          </div>

          <div className="flex justify-evenly">
            <button className="Verify-Button" type={"button"} onClick={showUpdateView}>
              Back
            </button>
            <button className="Verify-Button" type={"button"} onClick={sendUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="Update-div" ref={updateProfileRef}>
        <div className="Update-Title">Update your profile</div>
        <form className="flex flex-col self-center">
          <RegisterInputs />
          <div className="w-full flex justify-evenly">
            <button className="Register-Button" type={"button"} onClick={() => navigate("/Home")}>
              Back
            </button>
            <button className="Register-Button" type={"button"} onClick={showVerify}>
              Next
            </button>
          </div>
        </form>
      </div>
      <VerifyUser />
    </>
  );
}
