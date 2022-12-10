import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Switch from "@mui/material/Switch";

import ApiRequest from "./ApiFunctions";
import "./Styles/Home.css";
import "./Styles/UpdatePost.css";
import "./Styles/DeletePost.css";

import SearchIcon from "./Assets/search-icon.png";
import MessagesIcon from "./Assets/message-icon.png";
import LogoutIcon from "./Assets/logout-icon.png";
import MenuIcon from "./Assets/menu-icon.png";
import UserIcon from "./Assets/user-icon.png";
import "./Styles/Header.css";

import DisplayPicture from "./Assets/dp-silhouette.jpg";
import GlobeIcon from "./Assets/Globe-icon.png";
import LockIcon from "./Assets/Lock-icon.png";
import EditIcon from "./Assets/Edit-icon.png";
import TrashIcon from "./Assets/Trash-icon.png";
import "./Styles/Feed.css";
import "./Styles/NewPost.css";

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

function HomeContent({
  feedList,
  setFeedList,
  UserName,
  FullName,
  TotalLikes,
  CakeDay,
  ShowDeletePost,
  ShowEditPost,
}) {
  const navigate = useNavigate();
  const textInputRef = useRef();
  const [switchState, setSwitch] = useState(false);
  let onGoingRequest = false;

  // Creates new post and sends to the backend server api
  const createNewPost = async () => {
    if (onGoingRequest === true) {
      // This checks if the post request is still processing
      alert("There is an on going post request. Please wait...");
      return;
    }

    const storedToken = JSON.parse(localStorage.getItem("tokenId"));
    onGoingRequest = true;

    let textContent = textInputRef.current.value;
    if (!storedToken) {
      navigate("/");
    }
    const [StatusCode, Data] = await ApiRequest.createPost(storedToken, textContent, switchState);

    if (StatusCode === 400) {
      alert(Data[Object.keys(Data)[0]]);
    } else if (StatusCode === 401) {
      alert(Data);
    } else if (StatusCode === 500) {
      navigate("/ServerError");
    } else {
      // The user successfully created a new post
      let newPost = Data;
      setFeedList((current) => {
        return [newPost, ...current];
      });
      alert("You created a new post!");
      onGoingRequest = false;
    }
  };

  const iterateFeed = (feed) => {
    const feedId = feed._id;
    const feedContent = feed.Content;
    const feedLikes = feed.NumberOfLikes;
    const showPublic = feed.ShowPublic;

    return (
      <div className="FeedDiv" key={feedId}>
        <div className="FeedHeader">
          <div className="flex tablet:flex-col">
            <div className="flex">
              <div className="mr-2 text-black text-base self-center tablet:text-xs">{FullName}</div>
              <div className="text-[#2525259d] hidden tablet:block self-center">·</div>
              <img
                className="FeedStatusRight"
                src={showPublic ? GlobeIcon : LockIcon}
                alt={"Post privacy status"}
              />
            </div>
            <div className="FeedUserName">@{UserName}</div>
            <div className="text-[#2525259d] tablet:hidden">·</div>
            <img
              className="FeedStatusLeft"
              src={showPublic ? GlobeIcon : LockIcon}
              alt={"Post privacy status"}
            />
          </div>
        </div>

        <div className="FeedTextContent">{feedContent}</div>

        <div className="FeedFooter">
          <div className="FeedFooterText">
            {feedLikes} {feedLikes > 1 ? "Likes" : "Like"}
          </div>
          <div className="mr-2 self-center flex hover:text-[#238aff]">
            <div className="FeedUpdateDel" onClick={() => ShowEditPost(feedId, feedContent)}>
              <img className="FeedIcon" src={EditIcon} alt={"Edit this post"} />
            </div>
            <div className="FeedUpdateDel" onClick={() => ShowDeletePost(feedId)}>
              <img className="FeedIcon" src={TrashIcon} alt={"Delete this post"} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="ContentDiv">
      <div
        className="
        ml-8 mr-8 mb-4 border-[1px] border-solid border-[#999999c5] rounded-sm h-[40vh] 
        max-w-[20rem] min-w-[15rem] flex-grow-[3] bg-white shadow-sm 
        hover:border-[#494949c5] tablet:hidden"
      >
        <div className="h-[35%] bg-Cherry">
          <div className="h-full flex content-center items-center justify-center">
            <img
              className="aspect-square h-16 border-[2px] border-solid border-[#1f93ff]
              rounded-full"
              src={DisplayPicture}
              alt={"User round"}
            />
          </div>
        </div>

        <div className="mt-9 flex justify-center font-JetBrains">
          <div>
            <div className="text-base">{FullName}</div>
            <div className="text-xs text-[#6d6d6dcc] text-center">@{UserName}</div>
          </div>
        </div>

        <div className="mt-4 flex justify-around font-JetBrains">
          <div>
            <div className="text-sm">Total Likes</div>
            <div className="text-xs text-[#6d6d6dcc]">{TotalLikes}</div>
          </div>
          <div>
            <div className="text-sm">Cake Day</div>
            <div className="text-xs text-[#6d6d6dcc]">{CakeDay}</div>
          </div>
        </div>
      </div>

      <div className="ml-8 mr-8 flex-grow-[3] phone:ml-4 phone:mr-4 phone:flex-grow">
        <div className="NewPostDiv">
          <div className="p-2 flex">
            <div className="NewPostTitle">Create New Post</div>
          </div>
          <div className="mt-2 mb-2 pr-2 pl-2 flex">
            <textarea className="NewPostTextArea" ref={textInputRef} />
          </div>
          <div className="p-2 flex justify-between">
            <div className="flex items-center">
              <div>Public</div>
              <Switch checked={switchState} onChange={(event) => setSwitch(event.target.checked)} />
            </div>
            <button className="SubmitNewPost" onClick={createNewPost}>
              Submit
            </button>
          </div>
        </div>
        {feedList.length === 0 ? (
          <div className="NoPost">You have not yet created a post</div>
        ) : (
          <div>{feedList.map(iterateFeed)}</div>
        )}
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

        <HomeContent
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
