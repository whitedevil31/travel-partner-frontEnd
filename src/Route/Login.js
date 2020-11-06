import React from "react";
import { Link, useHistory } from "react-router-dom";

import "../App.css";
import { useForm } from "react-hook-form";

const Login = () => {
  let history = useHistory();

  const { register, handleSubmit } = useForm();

  const OnSubmit = (data) => {
    fetch("https://travel-partner-backend.herokuapp.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      response.json().then((res) => {
        const tokenId = res.token;

        setTimeout(() => {
          if (response.status === 200) {
            history.push("/dashboard", {
              tags: tokenId,
            });
          }
        }, 900);
      });
    });
  };
  return (
    <div>
      <h1>login page</h1>
      <form onSubmit={handleSubmit(OnSubmit)}>
        <input type="text" placeholder="email" name="email" ref={register} />
        <input
          type="password"
          placeholder="password"
          name="password"
          ref={register}
        />
        <input type="submit" />
      </form>
      <h4>if you dont have a account pls click here to register</h4>
      <Link to="/users">
        <button className="btn-sign-up">SIGNUP</button>
      </Link>
    </div>
  );
};

export default Login;
