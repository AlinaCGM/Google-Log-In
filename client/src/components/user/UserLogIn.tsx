import React from "react";
import GoogleLogIn from "../google/GoogleLogIn";
import LoginForm from "./LogInForm";

function UserLogIn() {
  return (
    <div>
      <LoginForm />
      <GoogleLogIn />
    </div>
  );
}

export default UserLogIn;
