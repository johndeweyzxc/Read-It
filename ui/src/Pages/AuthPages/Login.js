import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import LoginForm from "./LoginForm";
import {localIP} from "../../ip";

export default function Login() {
  const navigate = useNavigate();

  const TOKEN_ID = "tokenId";

  useEffect(() => {
    // Check if there exists a specific token on the local storage
    const storedToken = JSON.parse(localStorage.getItem(TOKEN_ID));
    if (storedToken) {
      navigate("/Home");
    }
  });

  const Welcome = () => {
    return (
      <div className='mt-4 mb-4 flex justify-center items-center font-JetBrains'>
        <div className='ml-16 mr-8 laptop:ml-8'>
          <div
            className='text-5xl font-extrabold tracking-wider text-Ponkan 
          laptop:text-center stablet:text-3xl'
          >
            Read It
          </div>
          <div
            className='text-base font-bold tracking-wide text-[#000] whitespace-nowrap
          stablet:whitespace-normal text-center'
          >
            Express yourself and connect to your friends
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='h-screen w-screen'>
      <div className='h-[15vh] w-screen shadow-md bg-gradient-to-r from-Ponkan to-Cherry' />
      <div className='h-[85vh] w-screen flex laptop:flex-col tablet:h-[95vh]'>
        <Welcome />
        <LoginForm localIP={localIP} />
      </div>
      <div className='h-[25vh] w-screen bg-gradient-to-r from-Ponkan to-Cherry' />
    </div>
  );
}
