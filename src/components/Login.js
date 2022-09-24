import React from "react";
import { loginUrl } from "../spotify";
import "./Login.css";
function Login() {
  return (
    <div className="login">
      <img src="/images/Spotify_Logo_CMYK_White.png" alt="" />
      <a href={loginUrl}>LOGIN</a>
    </div>
  );
}

export default Login;
