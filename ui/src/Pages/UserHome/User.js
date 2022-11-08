// Dependency imports
import {React, useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
// App imports
import Header from "./Header/Header";
import Messages from "./Messages/Messages";
import UserContent from "./UserContent";
import {HomeDiv, LoadingScreen, LoadingText} from "./GeneralStyles";

// This a user page when a user wants to visit a profile of another user
export default function User() {
  const {Username} = useParams();
  const navigate = useNavigate();
  const messagesRef = useRef();
  const settingsFloatRef = useRef();

  const TOKEN_ID = "tokenId";

  const [UserFeeds, setUserFeeds] = useState([]);
  const [UserName, setUserName] = useState("");
  const [FullName, setFullName] = useState("");
  const [TotalLikes, setTotalLikes] = useState(0);
  const [CakeDay, setCakeDay] = useState("");

  let showedMessage = false;
  let showedSettings = false;

  function hideAll() {
    settingsFloatRef.current.style.display = "none";
    messagesRef.current.style.display = "none";
  }

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

  // Run at first render to fetch data from the server
  useEffect(() => {
    const apiFetchUser = `http://${process.env.REACT_APP_REST_IP}:4000/User/${Username}`;
    const storedToken = JSON.parse(localStorage.getItem(TOKEN_ID));
    if (!storedToken) {
      navigate("/");
      return;
    }
    let response;

    const getUser = async () => {
      try {
        response = await fetch(apiFetchUser, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({TokenId: storedToken}),
        });
      } catch (error) {
        console.log(error);
      }

      if (response) {
        const result = await response.json();
        if (response.status === 201) {
          setUserFeeds(result.message);
          setUserName(result.username);
          setFullName(result.fullname);
          setTotalLikes(result.totallikes);
          setCakeDay(result.cakeday);
        } else if (response.status === 401) {
          alert(result.message);
          navigate("/");
        } else {
          navigate("/ServerError");
        }
      }
    };

    getUser();
  }, [Username, navigate]);

  const HeaderAndMessages = () => {
    return (
      <>
        <Header
          showMessages={showMessages}
          showSettings={showSettings}
          logoutAccount={logoutAccount}
          settingsFloatRef={settingsFloatRef}
          UserName={UserName}
        />
        <Messages messagesRef={messagesRef} />
      </>
    );
  };

  if (UserName === "") {
    return (
      <LoadingScreen>
        <LoadingText>Loading...</LoadingText>
      </LoadingScreen>
    );
  } else {
    return (
      <HomeDiv>
        <HeaderAndMessages />
        <UserContent
          feedList={UserFeeds}
          UserName={UserName}
          FullName={FullName}
          TotalLikes={TotalLikes}
          CakeDay={CakeDay}
        />
      </HomeDiv>
    );
  }
}
