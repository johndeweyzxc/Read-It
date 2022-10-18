// Dependency imports
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// App imports
import Header from "./Header/Header";
import Content from "./Contents/Content";
import Messages from "./Messages/Messages";
import UpdatePost from "./Contents/UpdatePost";
import DeletePostView from "./Contents/DeletePost";
import { localIP } from "../../ip";
import { SettingsButtons, Buttons } from "./Header/Settings";
import { SubmitPost } from "./Contents/NewPost";
import { HomeDiv, LoadingScreen, LoadingText } from "./GeneralStyles";

const UpdatePostDiv = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: none;
  justify-content: center;
  align-items: center;
  font-family: "JetBrains mono", monospace;
  z-index: 3;
  backdrop-filter: blur(5px);
`;

const DeletePostDiv = styled(UpdatePostDiv)``;

// Menu settings for small screens
const MobileMenuDiv = styled(UpdatePostDiv)`
  display: none;
`;
const MobileButtonDiv = styled(SettingsButtons)`
  border-top: 1px solid #7c7c7c;
`;
const MobileButton = styled(Buttons)`
  border-bottom: 1px solid #999999c5;
  width: 80vw;
`;
const BackButton = styled(SubmitPost)`
  padding: 0.55rem;
  padding-left: 1.55rem;
  padding-right: 1.55rem;
  align-self: center;
  margin-bottom: 0.85rem;
  margin-top: 0.85rem;
`;

// This is the main page component of a user. A user can modify user info and create, read, update a post.
export default function Home() {
  const navigate = useNavigate();
  const deletePostRef = useRef();
  const updatePostRef = useRef();
  const messagesRef = useRef();
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

  let showedMessage = false;
  let showedSettings = false;

  // Hides settings and messages
  function hideAll() {
    settingsFloatRef.current.style.display = "none";
    messagesRef.current.style.display = "none";
  }

  // This shows the messages when user clicked the messages in the header, currently underdevelopment.
  const showMessages = () => {
    hideAll();
    if (showedMessage) {
      hideAll();
      showedMessage = false;
    } else {
      messagesRef.current.style.display = "block";
      showedMessage = true;
    }
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
    const apiFetchPosts = `http://${localIP}:4000/Home`;
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

  // Header of home, this is where the search bar, settings and other navigations lives.
  const HomeHeader = () => {
    return (
      <Header
        showMessages={showMessages}
        showSettings={showSettings}
        showMenu={showMenu}
        logoutAccount={logoutAccount}
        settingsFloatRef={settingsFloatRef}
        UserName={UserName}
      />
    );
  };

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

  // This is the main body of the home page, this is where the feed list lives.
  const HomeContent = () => {
    return (
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
    );
  };

  // This is the menu navigation for small screen devices.
  const MobileMenu = () => {
    return (
      <MobileMenuDiv ref={mobileMenuRef}>
        <MobileButtonDiv>
          <MobileButton to={"/UpdateProfile"}>Update Profile</MobileButton>
          <MobileButton
            to={"/Home"}
            onClick={() => {
              alert("This feature is under development");
            }}
          >
            Messages
          </MobileButton>
          <MobileButton to={"/Home"}>Logout</MobileButton>
          <BackButton
            type={"button"}
            onClick={() => {
              mobileMenuRef.current.style.display = "none";
            }}
          >
            back
          </BackButton>
        </MobileButtonDiv>
      </MobileMenuDiv>
    );
  };

  if (UserName === "") {
    // While fetching data from the database, show a loading screen
    return (
      <LoadingScreen>
        <LoadingText>Loading...</LoadingText>
      </LoadingScreen>
    );
  } else {
    return (
      <HomeDiv>
        <HomeHeader />
        <UpdatePostDiv ref={updatePostRef}>
          <HomeUpdatePost />
        </UpdatePostDiv>
        <MobileMenu />
        <DeletePostDiv ref={deletePostRef}>
          <DeletePostView
            PostId={postId}
            setFeedList={setFeedList}
            CancelDeletePost={CancelDeletePost}
          />
        </DeletePostDiv>
        <Messages messagesRef={messagesRef} />
        <HomeContent />
      </HomeDiv>
    );
  }
}
