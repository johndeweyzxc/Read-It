import { React, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DisplayPicture from "./Assets/dp-silhouette.jpg";
import GlobeIcon from "./Assets/Globe-icon.png";
import Header from "./Header";
import "./Styles/Feed.css";

function SideInfo({ FullName, UserName, TotalLikes, CakeDay }) {
  return (
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
  );
}

function Feed({ feed, UserName, FullName }) {
  const feedContent = feed.Content;
  const feedLikes = feed.NumberOfLikes;

  return (
    <div className="FeedDiv">
      <div className="FeedHeader">
        <div className="flex tablet:flex-col">
          <div className="flex">
            <div className="mr-2 text-black text-base self-center tablet:text-xs">{FullName}</div>
            <div className="text-[#2525259d] hidden tablet:block self-center">·</div>
            <img className="FeedStatusRight" src={GlobeIcon} alt={"Post privacy status"} />
          </div>
          <div className="FeedUserName">@{UserName}</div>
          <div className="text-[#2525259d] tablet:hidden">·</div>
          <img className="FeedStatusLeft" src={GlobeIcon} alt={"Post privacy status"} />
        </div>
      </div>

      <div className="FeedTextContent">{feedContent}</div>

      <div className="FeedFooter">
        <div className="FeedFooterText">
          {feedLikes} {feedLikes > 1 ? "Likes" : "Like"}
        </div>
      </div>
    </div>
  );
}

function UserContent({ feedList, UserName, FullName, TotalLikes, CakeDay }) {
  const iterateFeed = (feed) => {
    return <Feed key={feed._id} feed={feed} UserName={UserName} FullName={FullName} />;
  };

  return (
    <div
      className="pt-[15vh] pl-24 pr-24 flex flex-row-reverse flex-wrap bg-[#c4c4c43f]
      overflow-y-hidden tablet:pl-4 tablet:pr-4 tablet:pt-[10vh] stablet:pl-0 stablet:pr-0"
    >
      <SideInfo FullName={FullName} UserName={UserName} TotalLikes={TotalLikes} CakeDay={CakeDay} />
      <div className="ml-8 mr-8 flex-grow-[3] phone:ml-4 phone:mr-4 phone:flex-grow">
        {feedList.length === 0 ? (
          <div className="NoPost">This user has not yet created a post</div>
        ) : (
          feedList.map(iterateFeed)
        )}
      </div>
    </div>
  );
}

// This a user page when a user wants to visit a profile of another user
export default function User() {
  const { Username } = useParams();
  const navigate = useNavigate();
  const settingsFloatRef = useRef();

  const TOKEN_ID = "tokenId";

  const [UserFeeds, setUserFeeds] = useState([]);
  const [UserName, setUserName] = useState("");
  const [FullName, setFullName] = useState("");
  const [TotalLikes, setTotalLikes] = useState(0);
  const [CakeDay, setCakeDay] = useState("");

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
          body: JSON.stringify({ TokenId: storedToken }),
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

  if (UserName === "") {
    return (
      <div className="absolute w-screen h-screen hidden justify-center items-center bg-white z-10">
        <div className="text-2xl font-JetBrains tracking-wide underline">Loading...</div>
      </div>
    );
  } else {
    return (
      <div className="w-screen h-auto">
        <Header logoutAccount={logoutAccount} settingsFloatRef={settingsFloatRef} UserName={UserName} />
        <UserContent
          feedList={UserFeeds}
          UserName={UserName}
          FullName={FullName}
          TotalLikes={TotalLikes}
          CakeDay={CakeDay}
        />
      </div>
    );
  }
}
