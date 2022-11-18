import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import "../updatePost.css";

export default function UpdatePost({ updateInfo, FeedList, setFeedList, CancelEditPost }) {
  const navigate = useNavigate();
  const TOKEN_ID = "tokenId";
  const [switchState, setSwitch] = useState(updateInfo.isPublic);
  let postId = updateInfo.postId;
  let content = updateInfo.content;
  let textAreaRef = useRef();

  // Updates the post in the UI, effect happens only in client side.
  const UpdateUI = () => {
    const currentPost = [...FeedList];
    const post = currentPost.find((post) => post._id === postId);
    post.Content = textAreaRef.current.value;
    post.ShowPublic = switchState;
    setFeedList(currentPost);
    CancelEditPost();
  };

  // Updates the post data on the database and on the UI.
  const UpdateUIAndDataBase = async () => {
    const storedToken = JSON.parse(localStorage.getItem(TOKEN_ID));
    const apiServerUpdatePost = `http://${process.env.REACT_APP_REST_IP}:4000/UpdatePost`;
    let response;

    if (!storedToken) {
      navigate("/");
      return;
    }

    let newContent = textAreaRef.current.value;
    let newSwitchValue = switchState;

    // If no changes have been made to the post
    if (newContent === content && newSwitchValue === updateInfo.isPublic) {
      alert("No changes have been made to the post");
      CancelEditPost();
      return;
    }

    try {
      response = await fetch(apiServerUpdatePost, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          PostId: postId,
          TokenId: storedToken,
          NewContent: textAreaRef.current.value,
          ShowPublic: switchState,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    if (response) {
      const result = await response.json();
      const message = result.message;

      // This checks if there is an invalid post id or invalid token id or unauthorized update.
      if (response.status === 400 || response.status === 401) {
        alert(message);
        navigate("/");
      } else if (response.status === 500) {
        navigate("/ServerError");
      }
      // The user successfully deleted a post
      else {
        // Update the UI
        UpdateUI();
        alert(message);
      }
    }
  };

  return (
    <div className="UpdatePostDiv">
      <div className="p-2 flex">
        <div className="text-lg phone:text-sm">Edit this Post</div>
      </div>
      <div className="mt-2 mb-2 pr-2 pl-2 flex">
        <textarea className="TextArea" defaultValue={updateInfo.content} ref={textAreaRef} />
      </div>
      <div className="p-2 flex justify-between">
        <Switch checked={switchState} onChange={(event) => setSwitch(event.target.checked)} />
        <div className="flex">
          <button className="Button" type={"button"} onClick={CancelEditPost}>
            Cancel
          </button>
          <button className="Button" type={"button"} onClick={() => UpdateUIAndDataBase()}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
