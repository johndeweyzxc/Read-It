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
};

export default ApiRequest;
