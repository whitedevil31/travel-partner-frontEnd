import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// const imgData = axios.post(imgData);

//   Axios.all([
//     Axios.post("https://travel-partner-backend.herokuapp.com/users", {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }),

//     Axios.post(
//       "https://travel-partner-backend.herokuapp.com/users/me/avatar",
//       fd,

//     ),
//   ]).then(
//     Axios.spread((obj1, obj2) => {
//       obj1.json().then((res) => {
//         console.log(res);
//       });
//       if (obj1.status === 201) {
//         history.push("/");
//       }
//       console.log(obj2);
//     })
//   );
