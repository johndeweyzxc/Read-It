import React, { useRef, useState } from "react";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";

export default function NewPost({ setFeedList }) {
  const navigate = useNavigate();
  const TOKEN_ID = "tokenId";
  const textInputRef = useRef();
  const [switchState, setSwitch] = useState(false);
  let onGoingRequest = false;

  // Creates new post and sends to the backend server api
  const createNewPost = async () => {
    let response;

    if (onGoingRequest === true) {
      // This checks if the post request is still processing
      alert("There is an on going post request. Please wait...");
      return;
    }

    const storedToken = JSON.parse(localStorage.getItem(TOKEN_ID));
    const apiServerCreatePost = `http://${process.env.REACT_APP_REST_IP}:4000/CreatePost`;
    onGoingRequest = true;

    let textContent = textInputRef.current.value;
    if (!storedToken) {
      navigate("/");
    }
    try {
      response = await fetch(apiServerCreatePost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TokenId: storedToken,
          PostContent: textContent,
          ShowPublic: switchState,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    if (response) {
      textInputRef.current.value = null;
      const result = await response.json();
      const message = result.message;
      const firstMessage = Object.keys(message)[0];
      // This checks if there is an error on user inputs
      if (response.status === 400) {
        alert(message[firstMessage]);
      }
      // Invalid token or the user is not logged in
      else if (response.status === 401) {
        alert(message);
        navigate("/");
      } else if (response.status === 500) {
        navigate("/ServerError");
      }
      // The user successfully create a new post
      else {
        let newPost = message;
        setFeedList((current) => {
          return [newPost, ...current];
        });
        alert("You created a new post!");
        onGoingRequest = false;
      }
    }
  };

  return (
    <div className="mb-4 border-[1px] border-solid border-[#999999c5] rounded-sm bg-white shadow-sm font-JetBrains">
      <div className="p-2 flex">
        <div className="text-lg tablet:text-base phone:text-sm">Create New Post</div>
      </div>
      <div className="mt-2 mb-2 pr-2 pl-2 flex">
        <textarea
          className="p-1 border-[1px] border-solid border-[#999999c5] resize-none flex-grow text-base font-JetBrains bg-white tablet:text-sm"
          ref={textInputRef}
        />
      </div>
      <div className="p-2 flex justify-between">
        <div className="flex items-center">
          <div>Public</div>
          <Switch checked={switchState} onChange={(event) => setSwitch(event.target.checked)} />
        </div>
        <button
          className="p-1 pl-4 pr-4 bg-Cherry rounded text-white text-sm phone:text-xs"
          type={"button"}
          onClick={createNewPost}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
