// Dependency imports
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// App imports
import { localIP } from "../../../Configs/IP_ADDR";
import { Header, Title as HeaderTitle, Footer } from "./NewPost";
import {
  EditPostDiv as EPostDiv,
  SubmitUpdates,
  ButtonContainer as BContainer,
} from "./UpdatePost";

const DeletePostDiv = styled(EPostDiv)`
  padding: 1rem;
  @media screen and (max-width: 400px) {
    padding: 0.5rem;
  }
`;

const FooterDiv = styled(Footer)`
  @media screen and (max-width: 400px) {
    padding: 0.25rem;
  }
`;

const Title = styled(HeaderTitle)`
  font-size: 1rem;
  @media screen and (max-width: 700px) {
    font-size: 0.8rem;
  }
  @media screen and (max-width: 400px) {
    font-size: 0.7rem;
  }
`;

const Button = styled(SubmitUpdates)`
  margin-right: 0;
  font-size: 0.9rem;
  @media screen and (max-width: 700px) {
    font-size: 0.8rem;
  }
  @media screen and (max-width: 400px) {
    font-size: 0.7rem;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
  }
`;

const ButtonContainer = styled(BContainer)`
  width: 100%;
  justify-content: space-evenly;
`;

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
    const apiServerDeletePost = `http://${localIP}:4000/DeletePost`;
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
    <DeletePostDiv>
      <Header>
        <Title>Are you sure you want to delete this Post?</Title>
      </Header>
      <FooterDiv>
        <ButtonContainer>
          <Button type={"button"} onClick={CancelDeletePost}>
            Cancel
          </Button>
          <Button type={"button"} onClick={DelViewAndDataBase}>
            Delete
          </Button>
        </ButtonContainer>
      </FooterDiv>
    </DeletePostDiv>
  );
}
