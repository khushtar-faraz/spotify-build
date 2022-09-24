import React from "react";
import { useStatevalue } from "../context/react-context";
import "./SidebarOption.css";

function SidebarOption({ title, Icon, id }) {
  const [{ playlistId, spotify }, dispatch] = useStatevalue();
  console.log("PLAYLIST ID IS >>>", playlistId);
  const handleClick = () => {
    dispatch({
      type: "SET_PLAYLIST_ID",
      playlistId: id,
    });

    spotify.getPlaylist(id).then((response) => {
      dispatch({
        type: "SET_CURRENT_PLAYLIST",
        currentPlaylist: response,
      });
    });
  };
  return (
    <div className="sidebarOption">
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? (
        <h4 onClick={handleClick}>{title}</h4>
      ) : (
        <p onClick={handleClick}>{title}</p>
      )}
    </div>
  );
}

export default SidebarOption;
