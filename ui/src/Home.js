import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Switch from "@mui/material/Switch";

import ApiRequest from "./ApiFunctions";
import Content from "./Content";
import "./Styles/Home.css";
import "./Styles/UpdatePost.css";
import "./Styles/DeletePost.css";

import SearchIcon from "./Assets/search-icon.png";
import MessagesIcon from "./Assets/message-icon.png";
import LogoutIcon from "./Assets/logout-icon.png";
import MenuIcon from "./Assets/menu-icon.png";
import UserIcon from "./Assets/user-icon.png";
import "./Styles/Header.css";

export function Header({ mobileMenuRef, UserName }) {
  const navigate = useNavigate();
  const UnderDev = () => {
    alert("This feature is under development");
  };

  return (
    <div className="fixed z-[2] filter blur-none">
      <div className="HeaderDiv">
        <div className="HeaderReadIt">Read It</div>

        <div className="flex mr-24 tablet:mr-4 sphone:hidden">
          <div className="self-center font-JetBrains">
            <div className="HeaderUserName">@{UserName}</div>
          </div>
        </div>

        <div className="HeaderSearchDiv">
          <img
            className="mr-2 ml-2 h-4 aspect-square hover:cursor-pointer"
            alt={"Search"}
            src={SearchIcon}
          />
          <input className="HeaderSearchInput" placeholder={"Seach a User"} onClick={UnderDev} />
        </div>

        <div className="mr-2 self-center flex">
          <div className="mr-4 hover:cursor-pointer stablet:hidden">
            <img
              className="HeaderMenuImages"
              src={MessagesIcon}
              alt={"Messages"}
              onClick={() => alert("This feature is currently not available")}
            />
          </div>

          <div className="mr-4 hover:cursor-pointer stablet:hidden">
            <img
              className="HeaderMenuImages"
              src={UserIcon}
              alt={"User"}
              onClick={() => navigate("/UpdateProfile")}
            />
          </div>

          <div className="mr-4 hover:cursor-pointer stablet:hidden">
            <img
              className="HeaderMenuImages"
              src={LogoutIcon}
              alt={"Logout"}
              onClick={() => {
                localStorage.removeItem("tokenId");
                navigate("/");
              }}
            />
          </div>

          <div className="hidden stablet:block">
            <img
              className="p1 rounded-sm h-6 aspect-square"
              src={MenuIcon}
              alt={"Menu"}
              onClick={() => (mobileMenuRef.current.style.display = "flex")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function UpdatePostComponent({ updatePostRef, FeedList, postId, setFeedList }) {
  const storedToken = JSON.parse(localStorage.getItem("tokenId"));
  const navigate = useNavigate();
  const [TextAreaVal, setText] = useState("");
  const [switchState, setSwitch] = useState(false);

  return (
    <div className="UpdatePostDiv">
      <div className="p-2 flex">
        <div className="text-lg phone:text-sm">Edit Post</div>
      </div>
      <div className="mt-2 mb-2 pr-2 pl-2 flex">
        <textarea
          className="UpdateTextArea"
          placeholder={"Type in your new comment here"}
          onChange={(event) => setText(event.target.value)}
        />
      </div>
      <div className="p-2 flex justify-between">
        <div className="flex">
          <div className="self-center">Public</div>
          <Switch checked={switchState} onChange={(event) => setSwitch(event.target.checked)} />
        </div>
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
                TextAreaVal,
                switchState
              );
              if (StatusCode === 400 || StatusCode === 401) {
                alert(Data.Content);
                navigate("/");
              } else if (StatusCode === 500) {
                navigate("/ServerError");
              } else {
                // Update the UI view
                const currentPost = [...FeedList];
                const post = currentPost.find((post) => post._id === postId);
                post.Content = TextAreaVal;
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
}

function DeletePostComponent({ deletePostRef, setFeedList, postId }) {
  const storedToken = JSON.parse(localStorage.getItem("tokenId"));
  const navigate = useNavigate();

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
}

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

export function Home() {
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
  const [feedContent, setFeedContent] = useState();

  useEffect(() => {
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
        localStorage.removeItem("tokenId");
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

  // This shows a popped out form and push the current data in the form.
  function ShowEditPost(PostId, FeedContent) {
    setPostId(PostId);
    setFeedContent(FeedContent);
    updatePostRef.current.style.display = "flex";
  }

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
          {feedContent === undefined ? null : (
            <UpdatePostComponent
              updatePostRef={updatePostRef}
              feedContent={feedContent}
              FeedList={FeedList}
              postId={postId}
              setFeedList={setFeedList}
            />
          )}
        </div>
        <div className="HomeDel" ref={deletePostRef}>
          <DeletePostComponent deletePostRef={deletePostRef} setFeedList={setFeedList} postId={postId} />
        </div>

        <Header mobileMenuRef={mobileMenuRef} UserName={UserName} />
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
