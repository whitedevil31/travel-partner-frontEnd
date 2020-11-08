import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../App.css";

const DashBoard = () => {
  var item;
  const location = useLocation();
  const nanda = location.state.tags || location.state.off;
  const [profile, getProfile] = useState({});
  const [logout, setLogout] = useState(false);
  const [redmi, setRedmi] = useState(false);
  const [result, setResult] = useState([]);
  const { register, handleSubmit } = useForm();

  const history = useHistory();
  useEffect(() => {
    const bearer = "Bearer " + nanda;
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
        getProfile(res);
      });
    });
  }, []);

  const OnSubmitHandler = async (data) => {
    const bearer = "Bearer " + nanda;

    const getting = await fetch(
      "https://travel-partner-backend.herokuapp.com/travel/filter",
      {
        method: "POST",
        withCredentials: true,
        headers: { Authorization: bearer, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const get = await getting.json();

    setTimeout(() => {
      setResult(get);
      console.log(result);
    }, 2000);

    // setTimeout(async () => {
    //   console.log(get);
    // }, 3000);

    // }).then((dataRes) => {
    //   dataRes.json().then((res) => {
    //     setResult(res);
    //     console.log(result);
    //   });
    // });
  };

  const logoutHandler = () => {
    const bearer = "Bearer " + nanda;

    fetch("https://travel-partner-backend.herokuapp.com/users/logout", {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
      },
    }).then((response) => {
      console.log(response.status);
      setLogout(true);
      setTimeout(() => {
        if (response.status === 200) {
          history.push("/");
        }
      }, 800);
    });
  };
  const componentHandler = (item) => {
    history.push(`/postId/${item}`, { locationId: item, pwd: nanda });
  };

  return (
    <div>
      <h1>DashBoard</h1>
      <form onSubmit={handleSubmit(OnSubmitHandler)}>
        <input
          type="text"
          placeholder="location to search for"
          name="location"
          ref={register}
        />
        <input
          type="text"
          placeholder="starting date"
          name="startDate"
          ref={register}
        />
        <input
          type="text"
          placeholder="ending date"
          name="endDate"
          ref={register}
        />

        <input type="submit" />
      </form>
      <button onClick={() => setRedmi(true)}>get my profile data</button>
      <button onClick={logoutHandler}>logout</button>
      {redmi && (
        <div>
          <h4>{profile.name}</h4>
          <h5>{profile.email}</h5>
        </div>
      )}
      {result && (
        <div className="component">
          {result.map((item) => (
            <div
              key={item._id}
              className="RESULT"
              onClick={() => {
                componentHandler(item._id);
              }}
            >
              <p>Name : {item.ownerName}</p>
              <p> Travel date :{item.startDate}</p>
              <p> Age :{item.ownerAge}</p>
              <p> Gender :{item.ownerGender}</p>
            </div>
          ))}
        </div>
      )}

      {logout && <h1>logging out !!!!</h1>}
      <Link to={{ pathname: "/post", state: { foo: nanda } }}>
        <button className="btn-sign-up">CreatePost</button>
      </Link>
      <a
        href={`https://whitedevil31-chatapp.herokuapp.com/chat.html?username=${profile.name}&room=${profile.name}`}
        target="_blank"
      >
        check msgs !
      </a>
    </div>
  );
};

export default DashBoard;
