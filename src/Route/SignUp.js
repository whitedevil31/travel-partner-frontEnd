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
    console.log(e.target.files[0]);
  };
  const fileUploadHandler = () => {
    const fd = new FormData();
    console.log(getAvatar);
    console.log(getAvatar.name);
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
      });
    // fetch("https://travel-partner-backend.herokuapp.com/users/me/pictures", {
    //   method: "POST",
    //   withCredentials: true,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: bearer,
    //   },
    //   body: fds,
    // }).then((res) => console.log(res));
  };

  const onSubmit = (data) => {
    // const fd = new FormData();
    // fd.append("avatar", getAvatar, getAvatar.name);

    var dataHeader = { "Content-Type": "application/json" };
    const jsonData = JSON.stringify(data);
    const dataURL = "https://travel-partner-backend.herokuapp.com/users";
    // const imgURL =
    //   "https://travel-partner-backend.herokuapp.com/users/me/avatar";
    const postData = axios.post(dataURL, jsonData, { headers: dataHeader });

    // const imgData = axios.post(imgURL, fd);
    axios.all([postData]).then(
      axios.spread((obj1) => {
        getDone(obj1.data);
        setShow(true);
        // if (obj1.status === 201) {
        //   history.push("/");
        // }
      })
    );
  };
  return (
    <div>
      <h1>sign up page</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="name" name="name" ref={register} />
        <input type="text" placeholder="email" name="email" ref={register} />
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
