import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [getAvatar, setAvatar] = useState(null);
  const [setDone, getDone] = useState({});
  const [show, setShow] = useState(false);
  const history = useHistory();
  const fileHandler = (e) => {
    setAvatar(e.target.files[0]);
  };
  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("pictures", getAvatar, getAvatar.name);
    const bearer = "Bearer " + setDone.token;

    axios
      .post(
        "https://travel-partner-backend.herokuapp.com/users/me/pictures",
        fd,
        { headers: { Authorization: bearer } }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          history.push("/");
        }
      });
  };

  const onSubmit = (data) => {
    fetch("https://travel-partner-backend.herokuapp.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      response.json().then((res) => {
        console.log("user data is " + res.user);
        console.log("token is " + res.token);
        getDone(res);

        setShow(true);
      });
    });
  };
  return (
    <div>
      <h1>sign up page</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="name" name="name" ref={register} />
        <input type="text" placeholder="email" name="email" ref={register} />
        <textarea
          type="text"
          placeholder="bio"
          className="bio"
          name="bio"
          ref={register}
        />
        <input
          type="text"
          placeholder="password"
          name="password"
          ref={register}
        />
        <input type="text" placeholder="gender" name="gender" ref={register} />
        <input type="text" placeholder="age" name="age" ref={register} />

        <input type="submit" />
        {show && (
          <div>
            <input type="file" onChange={fileHandler} />
            <button onClick={fileUploadHandler}>UPLOAD</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUp;
