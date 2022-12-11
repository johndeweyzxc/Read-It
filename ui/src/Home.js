// This is the home page when a user successfully logged in.

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

// Header used by the home page and the user page, it contains a search bar, a button to update
// user profile, a button to show messages and a logout button.
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
            {/* When the user logs out we remove the item from the local storage because this
              token is used by the user to create, delete or update a feed, it also serves 
              as a way so that the user does not need to relogin everytime it visits the 
              site. */}
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

// This is the main body of the home page, it contains the feed created by the user and the side info.
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

  // Creates new post and sends the new post to the backend server.
  const createNewPost = async () => {
    if (onGoingRequest === true) {
      // This checks if the post request is still processing.
      alert("There is an on going post request. Please wait...");
      return;
    }

    const storedToken = JSON.parse(localStorage.getItem("tokenId"));
    onGoingRequest = true;

    let textContent = textInputRef.current.value;
    // Here we check if the user has a token stored locally, if it doesn't then we redirect them to the
    // login page.
    if (!storedToken) {
      navigate("/");
    }
    // Tell the server about the new post created by the user.
    const [StatusCode, Data] = await ApiRequest.createPost(storedToken, textContent, switchState);

    if (StatusCode === 400) {
      alert(Data[Object.keys(Data)[0]]);
    } else if (StatusCode === 401) {
      alert(Data);
    } else if (StatusCode === 500) {
      navigate("/ServerError");
    } else {
      // If the status code is 200 then the user successfully created a new feed and now we update
      // the client ui.
      let newPost = Data;
      setFeedList((current) => {
        return [newPost, ...current];
      });
      alert("You created a new post!");
      onGoingRequest = false;
    }
  };

  // This is the component that each feed created by the user will use.
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
      {/* This is the side info it contains information about the user such as when was the account
      created, total number of likes, full name and username. */}

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

      {/* This is where the user's feed is shown */}
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
          // If there is no feed created by the user
          <div className="NoPost">You have not yet created a post</div>
        ) : (
          // Otherwise create a list of feed
          <div>{feedList.map(iterateFeed)}</div>
        )}
      </div>
    </div>
  );
}

// This is the component that shows up above the UI and blurs the background when the editing button
// is clicked on the feed. The editing button is on the right side corner of each feed, you will see
// a pencil or pen-like symbol.
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

              // Tell the server about the update of the feed
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
                // If the server successfully updates the feed in database then
                // update the UI to show the updated feed.

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

// This is the component that shows up above the UI and blurs the background when the delete button
// is clicked on the feed. The delete button is on the right side corner of each feed, you will see
// a trash symbol.
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

              // Tell the rest api to delete this feed
              const [StatusCode, Data] = await ApiRequest.deletePost(storedToken, postId);
              if (StatusCode === 401) {
                alert(Data);
              } else if (StatusCode === 500) {
                navigate("/ServerError");
              } else {
                // The server returns a status code of 200 and it successfully deleted the feed, we then
                // update the client ui to reflect the new change on the feed list.
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

// This is the menu navigation for small screen devices, this component is used by the user page.
export function MenuForPhone({ mobileMenuRef }) {
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
            // When the user logs out we remove the item from the local storage because this
            // token is used by the user to create, delete or update a feed, it also serves
            // as a way so that the user does not need to relogin everytime it visits the
            // site.

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

  // Run at first render
  useEffect(() => {
    const FetchData = async () => {
      // Fetch all user post from ther server
      const [StatusCode, Data] = await ApiRequest.getPosts();
      if (StatusCode === 201) {
        setFeedList(Data[0]);
        setUserName(Data[1]);
        setFullName(Data[2]);
        setTotalLikes(Data[3]);
        setCakeDay(Data[4]);
      } else if (StatusCode === 401) {
        // If it returns a status code of 401 that means, the user's token must have been expired so
        // the user needs to relogin, to gain a token to be use to create, read, update or delete a
        // feed.
        alert(Data);
        localStorage.removeItem("tokenId");
        navigate("/");
      } else {
        navigate("/ServerError");
      }
    };

    FetchData();
  }, [navigate]);

  // This shows a popped out message if the user really wants to delete a feed.
  function ShowDeletePost(PostId) {
    setPostId(PostId);
    deletePostRef.current.style.display = "flex";
  }

  // This shows a popped out form and push the current data in the form.
  function ShowEditPost(PostId) {
    setPostId(PostId);
    updatePostRef.current.style.display = "flex";
  }

  // In ShowDeletePost and ShowEditPost function we set the feed id from the value of the parameter
  // PostId, because when the user clicks the edit or delete button, the feed calls this function and
  // sets its unique identifier in PostId, so we know which feed to delete or update from the list.

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
          <UpdatePostComponent
            updatePostRef={updatePostRef}
            FeedList={FeedList}
            postId={postId}
            setFeedList={setFeedList}
          />
        </div>
        <div className="HomeDel" ref={deletePostRef}>
          <DeletePostComponent deletePostRef={deletePostRef} setFeedList={setFeedList} postId={postId} />
        </div>

        <Header mobileMenuRef={mobileMenuRef} UserName={UserName} />
        {/* This is the nav menu in the top right corner of the site, it only shows when client screen is small. */}
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
