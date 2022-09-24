import React from "react";
import { useStatevalue } from "../context/react-context";
import "./Body.css";
import Header from "./Header";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongComponent from "./SongComponent";

function Body() {
  const[{currentPlaylist}]=useStatevalue()
  return <div className="body">
    <Header />
    <div className="body__info">
      <img src={currentPlaylist?.images[0].url} alt="" />
      <div className="body__infoText">
        <strong>PLAYLIST</strong>
        <h2>{currentPlaylist?.name}</h2>
      </div>
    </div>
    <div className="body__songs">
      <div className="body__icons">
        <PlayCircleFilledIcon className="body__shuffle"/>
        <MoreHorizIcon />
      </div>
      {currentPlaylist?.tracks.items.map((item) => (
          <SongComponent key={item.track.id} track={item.track}/>
        ))}
    </div>
  </div>;
}

export default Body;
