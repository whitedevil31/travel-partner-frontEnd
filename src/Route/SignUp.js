import React from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { register, handleSubmit } = useForm();

  const history = useHistory();
  const onSubmit = (data) => {
    fetch("https://travel-partner-backend.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      response.json().then((res) => {
        // console.log(res.user);
      });
      if (response.status === 201) {
        history.push("/");
      }
    });
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
      </form>
    </div>
  );
};

export default SignUp;
