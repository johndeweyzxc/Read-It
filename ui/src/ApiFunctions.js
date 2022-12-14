const ApiRequest = {
  getPosts: async function () {
    let response;

    try {
      response = await fetch(`http://${process.env.REACT_APP_REST_IP}:4000/Home`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TokenId: JSON.parse(localStorage.getItem("tokenId")),
        }),
      });
    } catch (error) {
      console.log(error);
    }

    if (response) {
      const result = await response.json();
      if (response.status === 201) {
        return [
          201,
          [result.message, result.username, result.fullname, result.totallikes, result.cakeday],
        ];
      } else if (response.status === 401) {
        return [401, result.message];
      }
    }
  },
  deletePost: async function (storedToken, postId) {
    let response;

    try {
      response = await fetch(`http://${process.env.REACT_APP_REST_IP}:4000/DeletePost`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TokenId: storedToken,
          PostId: postId,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    if (response) {
      const result = await response.json();
      if (response.status === 401) {
        return [401, result.message];
      } else if (response.status === 500) {
        return [500];
      } else {
        return [201, result.message];
      }
    }
  },
  updatePost: async function (storedToken, postId, newContent, showPublic) {
    let response;

    try {
      response = await fetch(`http://${process.env.REACT_APP_REST_IP}:4000/UpdatePost`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          PostId: postId,
          TokenId: storedToken,
          NewContent: newContent,
          ShowPublic: showPublic,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    if (response) {
      const result = await response.json();

      if (response.status === 400 || response.status === 401) {
        return [response.status, result.message];
      } else if (response.status === 500) {
        return [500];
      } else {
        return [201, result.message];
      }
    }
  },
  createPost: async function (storedToken, textContent, switchState) {
    const apiServerCreatePost = `http://${process.env.REACT_APP_REST_IP}:4000/CreatePost`;
    let response;

    try {
      response = await fetch(apiServerCreatePost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TokenId: storedToken,
          PostContent: textContent,
          ShowPublic: switchState,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    if (response) {
      const result = await response.json();
      const message = result.message;

      // This checks if there is an error on user inputs
      if (response.status === 400) {
        // The message is the errors in user inputs
        return [400, message];
      }
      // Invalid token or the user is not logged in
      else if (response.status === 401) {
        return [401, message];
      }
      // This is a server error
      else if (response.status === 500) {
        return [500];
      } else {
        // The message is the data of the new post
        return [201, message];
      }
    }
  },
};

export default ApiRequest;
