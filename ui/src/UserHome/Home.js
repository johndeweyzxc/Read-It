import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Header from "./Header/Header";
import Content from "./Contents/Content";
import UpdatePost from "./Contents/UpdatePost";
import DeletePostView from "./Contents/DeletePost";

// This is the main page component of a user. A user can modify user info and create, read, update a post.
export default function Home() {
  const navigate = useNavigate();
  const deletePostRef = useRef();
  const updatePostRef = useRef();
  const settingsFloatRef = useRef();
  const mobileMenuRef = useRef();

  const TOKEN_ID = "tokenId";

  const [FeedList, setFeedList] = useState([]);
  const [UserName, setUserName] = useState("");
  const [FullName, setFullName] = useState("");
  const [TotalLikes, setTotalLikes] = useState(0);
  const [CakeDay, setCakeDay] = useState("");
  const [postId, setPostId] = useState();

  const [updateInfo, setUpdateInfo] = useState();

  let showedSettings = false;

  // Hides settings
  function hideAll() {
    settingsFloatRef.current.style.display = "none";
  }

  // This shows the messages when user clicked the messages in the header, currently underdevelopment.
  const showMessages = () => {
    alert("This feature is currently not available");
  };

  // This shows the navigation settings when user clicked the settings in the header
  const showSettings = () => {
    hideAll();
    if (showedSettings) {
      hideAll();
      showedSettings = false;
    } else {
      settingsFloatRef.current.style.display = "block";
      showedSettings = true;
    }
  };

  const logoutAccount = () => {
    localStorage.removeItem(TOKEN_ID);
    navigate("/");
  };

  // This is for small screen devices
  let menuIsShowed = false;
  const showMenu = () => {
    menuIsShowed = true;
    mobileMenuRef.current.style.display = "flex";
  };

  // When the user is using mobile device like android and clicks on a back button
  window.addEventListener("popstate", () => {
    if (menuIsShowed) {
      menuIsShowed = false;
      mobileMenuRef.current.style.display = "none";
    }
  });

  // Run at first render to fetch data from the server
  useEffect(() => {
    const apiFetchPosts = `http://${process.env.REACT_APP_REST_IP}:4000/Home`;
    let response;
    const storedToken = JSON.parse(localStorage.getItem(TOKEN_ID));

    const getUserPosts = async () => {
      try {
        response = await fetch(apiFetchPosts, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            TokenId: storedToken,
          }),
        });
      } catch (error) {
        console.log(error);
      }

      if (response) {
        const result = await response.json();
        if (response.status === 201) {
          // Set all the required data in the state
          setFeedList(result.message);
          setUserName(result.username);
          setFullName(result.fullname);
          setTotalLikes(result.totallikes);
          setCakeDay(result.cakeday);
        } else if (response.status === 401) {
          alert(result.message);
          localStorage.removeItem(TOKEN_ID);
          navigate("/");
        } else {
          navigate("/ServerError");
        }
      }
    };

    if (storedToken) {
      getUserPosts();
    } else {
      navigate("/");
    }
  }, [navigate]);

  // This shows a popped out message if the user really wants to delete a post.
  function ShowDeletePost(PostId) {
    setPostId(PostId);
    deletePostRef.current.style.display = "flex";
  }

  // This hides the confimation message for deleting a post
  function CancelDeletePost() {
    deletePostRef.current.style.display = "none";
  }

  // This shows a popped out form and push the current data in the form.
  function ShowEditPost(PostId, IsPublic, FeedContent) {
    let objectUpdate = {
      postId: PostId,
      isPublic: IsPublic,
      content: FeedContent,
    };
    setUpdateInfo(objectUpdate);
    updatePostRef.current.style.display = "flex";
  }

  function CancelEditPost() {
    updatePostRef.current.style.display = "none";
  }

  // Will only return when the user clicks the edit button on the feed
  const HomeUpdatePost = () => {
    if (updateInfo === undefined) {
      return null;
    } else {
      return (
        <UpdatePost
          updateInfo={updateInfo}
          FeedList={FeedList}
          setFeedList={setFeedList}
          CancelEditPost={CancelEditPost}
        />
      );
    }
  };

  // This is the menu navigation for small screen devices.
  const MobileMenu = () => {
    return (
      <div
        className="fixed w-screen h-screen hidden justify-center items-center font-JetBrains z-10 backdrop-blur-sm"
        ref={mobileMenuRef}
      >
        <div className="flex flex-col bg-white border-t-[1px] border-t-solid border-t-[#7c7c7c]">
          <Link
            className="w-[80vw] pl-4 pr-4 pt-3 pb-3 text-base font-JetBrains border-b-[1px] border-b-solid border-b-[#999999c5] hover:cursor-pointer hover:bg-[#b4b4b477]"
            to={"/UpdateProfile"}
          />
          <Link
            className="w-[80vw] pl-4 pr-4 pt-3 pb-3 text-base font-JetBrains border-b-[1px] border-b-solid border-b-[#999999c5] hover:cursor-pointer hover:bg-[#b4b4b477]"
            to={"/Home"}
            onClick={() => {
              alert("This feature is under development");
            }}
          />
          <Link
            className="w-[80vw] pl-4 pr-4 pt-3 pb-3 text-base font-JetBrains border-b-[1px] border-b-solid border-b-[#999999c5] hover:cursor-pointer hover:bg-[#b4b4b477]"
            to={"/Home"}
          />
          <button
            className="p-2 pl-6 pr-6 self-center mb-3 mt-3 bg-Cherry rounded text-white text-base"
            type={"button"}
            onClick={() => {
              mobileMenuRef.current.style.display = "none";
            }}
          >
            back
          </button>
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
        <Header
          showMessages={showMessages}
          showSettings={showSettings}
          showMenu={showMenu}
          logoutAccount={logoutAccount}
          settingsFloatRef={settingsFloatRef}
          UserName={UserName}
        />
        <div
          className="fixed w-screen h-screen hidden justify-center items-center font-JetBrains z-10 backdrop-blur-sm"
          ref={updatePostRef}
        >
          <HomeUpdatePost />
        </div>
        <MobileMenu />
        <div
          className="fixed w-screen h-screen hidden justify-center items-center font-JetBrains z-10 backdrop-blur-sm"
          ref={deletePostRef}
        >
          <DeletePostView
            PostId={postId}
            setFeedList={setFeedList}
            CancelDeletePost={CancelDeletePost}
          />
        </div>
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
