import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";

import ApiRequest from "./ApiFunctions";
import Header from "./Header";
import Content from "./Content";
import { MenuForPhone } from "./Responsive/PhoneScreen";
import "./Home.css";
import "./UpdatePost.css";
import "./DeletePost.css";

export default function Home() {
  const TOKEN_ID = "tokenId";
  const storedToken = JSON.parse(localStorage.getItem(TOKEN_ID));
  const navigate = useNavigate();

  const deletePostRef = useRef();
  const updatePostRef = useRef();
  const mobileMenuRef = useRef();

  const [FeedList, setFeedList] = useState([]);
  const [UserName, setUserName] = useState("");
  const [FullName, setFullName] = useState("");
  const [TotalLikes, setTotalLikes] = useState(0);
  const [CakeDay, setCakeDay] = useState("");

  const [postId, setPostId] = useState();
  const [isPublic, setIsPublic] = useState();
  const [feedContent, setFeedContent] = useState();

  useEffect(() => {
    console.log("UseEffect runs");
    const FetchData = async () => {
      const [StatusCode, Data] = await ApiRequest.getPosts();
      if (StatusCode === 201) {
        setFeedList(Data[0]);
        setUserName(Data[1]);
        setFullName(Data[2]);
        setTotalLikes(Data[3]);
        setCakeDay(Data[4]);
      } else if (StatusCode === 401) {
        alert(Data);
        localStorage.removeItem(TOKEN_ID);
        navigate("/");
      } else {
        navigate("/ServerError");
      }
    };

    FetchData();
  }, [navigate]);

  // This shows a popped out message if the user really wants to delete a post.
  function ShowDeletePost(PostId) {
    setPostId(PostId);
    deletePostRef.current.style.display = "flex";
  }

  const DeletePostComponent = () => {
    return (
      <div className="DeletePostDiv">
        <div className="p-2 flex">
          <div className="DelConfirm">Are you sure you want to delete this Post?</div>
        </div>
        <div className="p-2 flex justify-between phone:p-1">
          <div className="flex w-full justify-evenly">
            <button className="DelButton" onClick={() => (deletePostRef.current.style.display = "none")}>
              Cancel
            </button>
            <button
              className="DelButton"
              onClick={async () => {
                if (!storedToken) {
                  navigate("/");
                  return;
                }

                const [StatusCode, Data] = await ApiRequest.deletePost(storedToken, postId);
                if (StatusCode === 401) {
                  alert(Data);
                } else if (StatusCode === 500) {
                  navigate("/ServerError");
                } else {
                  // Update the UI view to remove the post
                  setFeedList((current) => {
                    return current.filter((post) => {
                      return post._id !== postId;
                    });
                  });

                  deletePostRef.current.style.display = "none";
                  alert(Data);
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  // This shows a popped out form and push the current data in the form.
  function ShowEditPost(PostId, IsPublic, FeedContent) {
    setPostId(PostId);
    setIsPublic(IsPublic);
    setFeedContent(FeedContent);
    updatePostRef.current.style.display = "flex";
  }

  const UpdatePostComponent = () => {
    const [switchState, setSwitch] = useState(isPublic);
    let textAreaRef = useRef();

    return (
      <div className="UpdatePostDiv">
        <div className="p-2 flex">
          <div className="text-lg phone:text-sm">Edit this Post</div>
        </div>
        <div className="mt-2 mb-2 pr-2 pl-2 flex">
          <textarea className="UpdateTextArea" defaultValue={feedContent} ref={textAreaRef} />
        </div>
        <div className="p-2 flex justify-between">
          <Switch checked={switchState} onChange={(event) => setSwitch(event.target.checked)} />
          <div className="flex">
            <button
              className="UpdateButton"
              onClick={() => (updatePostRef.current.style.display = "none")}
            >
              Cancel
            </button>
            <button
              className="UpdateButton"
              onClick={async () => {
                if (!storedToken) {
                  navigate("/");
                  return;
                }

                const [StatusCode, Data] = await ApiRequest.updatePost(
                  storedToken,
                  postId,
                  textAreaRef.current.value,
                  switchState
                );
                if (StatusCode === 400 || StatusCode === 401) {
                  console.log(Data);
                  alert(Data);
                  navigate("/");
                } else if (StatusCode === 500) {
                  navigate("/ServerError");
                } else {
                  // Update the UI view
                  const currentPost = [...FeedList];
                  const post = currentPost.find((post) => post._id === postId);
                  post.Content = textAreaRef.current.value;
                  post.ShowPublic = switchState;
                  setFeedList(currentPost);
                  updatePostRef.current.style.display = "none";
                  alert(Data);
                }
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (UserName === "") {
    // While fetching data from the database, show a loading screen
    return (
      <div className="absolute w-screen h-screen hidden justify-center items-center bg-white z-10">
        <div className="text-2xl font-JetBrains tracking-wide underline">Loading...</div>
      </div>
    );
  } else {
    return (
      <div className="w-screen h-auto">
        <div className="HomeUpdate" ref={updatePostRef}>
          {feedContent === undefined ? null : <UpdatePostComponent />}
        </div>
        <div className="HomeDel" ref={deletePostRef}>
          <DeletePostComponent />
        </div>

        <Header
          showMessages={() => alert("This feature is currently not available")}
          mobileMenuRef={mobileMenuRef}
          UserName={UserName}
        />
        <MenuForPhone mobileMenuRef={mobileMenuRef} />

        <Content
          feedList={FeedList}
          setFeedList={setFeedList}
          UserName={UserName}
          FullName={FullName}
          TotalLikes={TotalLikes}
          CakeDay={CakeDay}
          ShowDeletePost={ShowDeletePost}
          ShowEditPost={ShowEditPost}
        />
      </div>
    );
  }
}
