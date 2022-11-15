import React from "react";
import { useNavigate } from "react-router-dom";

export default function DeletePost({ PostId, setFeedList, CancelDeletePost }) {
  const navigate = useNavigate();
  const TOKEN_ID = "tokenId";
  let onGoingRequest = false;

  // Deletes a post from the view, effect happens only in client side.
  const DeleteFromView = () => {
    setFeedList((current) => {
      return current.filter((post) => {
        return post._id !== PostId;
      });
    });
    CancelDeletePost();
  };

  // Delete a post from the client side and sends the delete query to the database
  const DelViewAndDataBase = async () => {
    // This checks if the delete request is still processing
    if (onGoingRequest === true) {
      alert("There is an on going delete request. Please wait...");
      return;
    }

    const storedToken = JSON.parse(localStorage.getItem(TOKEN_ID));
    const apiServerDeletePost = `http://${process.env.REACT_APP_REST_IP}:4000/DeletePost`;
    let response;
    onGoingRequest = true;

    if (!storedToken) {
      navigate("/");
      onGoingRequest = false;
      return;
    }

    try {
      response = await fetch(apiServerDeletePost, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TokenId: storedToken,
          PostId: PostId,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    if (response) {
      const result = await response.json();
      const message = result.message;

      // This checks if there is an invalid post id or invalid token id or unauthorized deletion
      if (response.status === 401) {
        alert(message);
        navigate("/");
      } else if (response.status === 500) {
        navigate("/ServerError");
      }
      // The user successfully deleted a post
      else {
        // Update the UI
        DeleteFromView();
        alert(message);
      }

      onGoingRequest = false;
    }
  };

  return (
    <div className="p-4 border-[1px] border-solid border-[#999999c5] rounded-sm shadow-sm bg-white phone:p-2">
      <div className="p-2 flex">
        <div className="text-base tablet:text-sm phone:text-xs text-black">
          Are you sure you want to delete this Post?
        </div>
      </div>
      <div className="p-2 flex justify-between phone:p-1">
        <div className="flex w-full justify-evenly">
          <button
            className="p-2 pl-4 pr-4 tracking-wide bg-Cherry rounded-md text-white text-sm phone:text-xs"
            type={"button"}
            onClick={CancelDeletePost}
          >
            Cancel
          </button>
          <button
            className="p-2 pl-4 pr-4 tracking-wide bg-Cherry rounded-md text-white text-sm phone:text-xs"
            type={"button"}
            onClick={DelViewAndDataBase}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
