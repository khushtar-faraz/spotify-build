import React from "react";
import "./SongComponent.css";
import { useStatevalue } from "../context/react-context";
function SongComponent({ track }) {
  const [{ spotify }, dispatch] = useStatevalue();
  const handleSongPlaying = () => {
    dispatch({
      type: "SET_PLAYINGTRACK_ID",
      playingTrackId: track.id,
    });

    dispatch({
      type: "SET_IS_PLAYING",
      isPlaying: true,
    });
    spotify.play({ uris: [track.uri] });
  };
  return (
    <div onClick={handleSongPlaying} className="songComponent">
      <img
        className="songComponent__album"
        src={track.album.images[0].url}
        alt=""
      />
      <div className="songComponent__info">
        <h1>{track.name}</h1>
        <p>
          {track.artists.map((artist) => artist.name).join(",")}-{" "}
          {track.album.name}
        </p>
      </div>
    </div>
  );
}

export default SongComponent;
