import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";

import "../App.css";

const PostId = () => {
  const [result, setResult] = useState({});
  const [profile, getProfile] = useState({});
  const [show, setShow] = useState(false);
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    const bearer = "Bearer " + location.state.pwd;
    fetch("https://travel-partner-backend.herokuapp.com/users/me", {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((res) => {
        console.log(res);
        console.log("porilf egot");
        getProfile(res);
      });
    });
  }, []);
  useEffect(() => {
    const ids = location.state.locationId;
    const bearer = "Bearer " + location.state.pwd;

    fetch(`https://travel-partner-backend.herokuapp.com/travel/${ids}`, {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((res) => {
        console.log(res);
        setResult(res);
        setTimeout(() => {
          setShow(true);
          console.log("set true da");
        }, 300);
      });
    });
  }, []);
  const chatHandler = (name) => {
    console.log(name);
    // window.location.assign(
    //
    // );
  };
  return (
    show && (
      <div>
        <h1>Your location is {result.location}</h1>
        <h1>{result.ownerName}</h1>
        <a
          href={`https://whitedevil31-chatapp.herokuapp.com/chat.html?username=${profile.name}&room=${result.ownerName}`}
          target="_blank"
        >
          chatnow !
        </a>
        <button
          onClick={() => {
            chatHandler(result.ownerName);
          }}
        >
          chat now{" "}
        </button>
      </div>
    )
  );
};

export default PostId;
