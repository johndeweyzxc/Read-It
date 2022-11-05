import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";

export default function LoginForm2({localIP}) {
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();

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
        localStorage.setItem("tokenId", JSON.stringify(token));

        navigate("/Home");
      } else {
        alert("Wrong username or password");
      }
    }
  };

  return (
    <div
      className='
        h-[85vh] w-screen flex justify-center 
        items-center laptop:mt-8 laptop:items-start'
    >
      <div
        className='p-8 border-[1px] border-solid 
          border-ShallowGrey rounded-lg flex flex-col shadow'
      >
        <input
          className='w-[25vw] mb-4 border-2 border-solid border-Ponkan
          rounded-lg p-2 outline-none text-lg font-JetBrains laptop:w-[40vw]
          laptop:text-base tablet:w-[60vw]'
          name={"userName"}
          type={"text"}
          placeholder={"Username"}
          ref={username}
        />
        <input
          className='w-[25vw] mb-2 border-2 border-solid border-Ponkan
            rounded-lg p-2 outline-none text-lg font-JetBrains laptop:w-[40vw]
            laptop:text-base tablet:w-[60vw]'
          name={"passWord"}
          type={"password"}
          placeholder='Password'
          ref={password}
        />

        <div
          className='mb-4 p-2 text-center text-base font-JetBrains
          underline hover:cursor-pointer laptop:text-sm'
          onClick={() => {
            navigate("/PasswordReset");
          }}
        >
          Forgot your password?
        </div>
        <button
          className='w-[70%] p-2 text-base font-JetBrains font-bold tracking-wide
            bg-Cherry border border-solid border-Cherry rounded-lg
            text-white self-center hover:cursor-pointer shadow'
          type={"button"}
          onClick={loginRequest}
        >
          Login
        </button>

        <div className='mt-4 mb-4 w-full h-[1px] bg-ShallowGrey' />

        <button
          className='w-[70%] p-2 text-base font-JetBrains font-medium tracking-wide
        bg-black border border-solid border-black rounded-lg
        text-white self-center hover:cursor-pointer shadow'
          type={"button"}
          onClick={() => navigate("/Register")}
        >
          Create New Account
        </button>
      </div>
    </div>
  );
}
