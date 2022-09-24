import React from "react";
import "./Header.css";
import Avatar from "@mui/material/Avatar";
import { useStatevalue } from "../context/react-context";

function Header() {
  const [{ user }, dispatch] = useStatevalue();
  return (
    <div className="header">
      <div
        onClick={() => dispatch({ type: "SET_TOKEN", token: null })}
        className="header__avatar"
      >
        <Avatar
          className="header__avatarImage"
          src={user?.images[0]?.url}
          alt=""
        />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
