import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Home.css";

export function MenuForPhone({ mobileMenuRef }) {
  // This is the menu navigation for small screen devices.
  const navigate = useNavigate();

  return (
    <div className="MobileMenuDiv" ref={mobileMenuRef}>
      <div className="flex flex-col bg-white border-[1px] border-solid border-[#999999c5] ">
        <Link className="MobileMenuBtn" to={"/UpdateProfile"}>
          Update Profile
        </Link>
        <Link
          className="MobileMenuBtn"
          to={"/Home"}
          onClick={() => {
            localStorage.removeItem("tokenId");
            navigate("/");
          }}
        >
          Logout
        </Link>

        <button
          className="MobileButtonBck"
          onClick={() => (mobileMenuRef.current.style.display = "none")}
        >
          back
        </button>
      </div>
    </div>
  );
}
