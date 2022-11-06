import React from "react";

import "./styles.css";

export default function PasswordReset() {
  return (
    <div className='w-screen h-screen tablet:h-auto flex flex-col justify-center'>
      <form className='flex flex-col items-center'>
        <div
          className='mt-4 mb-6 pl-8 pr-8 pb-2 text-3xl phone:text-lg
        font-JetBrains border-b-[1px] border-solid border-black'
        >
          Reset your Password
        </div>

        <div className='flex tablet:flex-col'>
          <div className='inputSection'>
            <label className='labelStyle'>Email: </label>
            <input
              className='inputStyle'
              type={"text"}
              placeholder={"johndewey22@gmail.com"}
            />
          </div>
          <div className='inputSection'>
            <label className='labelStyle'>Email OTP: </label>
            <input
              className='inputStyle'
              type={"text"}
              placeholder={"OTP Code"}
            />
          </div>
        </div>

        <div className='flex tablet:flex-col'>
          <div className='inputSection'>
            <label className='labelStyle'>Phone Number: </label>
            <input
              className='inputStyle'
              type={"text"}
              placeholder={"09993241123"}
            />
          </div>
          <div className='inputSection'>
            <label className='labelStyle'>Phone Number OTP: </label>
            <input
              className='inputStyle'
              type={"text"}
              placeholder={"OTP Code"}
            />
          </div>
        </div>

        <button
          className='mt-2 mb-4 p-2 pl-8 pr-8 font-JetBrains text-base tracking-wide
        bg-Cherry border border-solid border-Cherry rounded-lg text-white
        hover:cursor-pointer'
          onClick={() => alert("This feature is under development")}
        >
          Verify
        </button>
      </form>
    </div>
  );
}
