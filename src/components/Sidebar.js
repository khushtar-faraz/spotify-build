import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { useStatevalue } from "../context/react-context";

function Sidebar() {
  const [{ playlists }] = useStatevalue();
  return (
    <div className="sidebar">
      <div className="sidebar__upper">
      <img
        className="sidebar__logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <SidebarOption title="Home" Icon={HomeIcon} />
      <SidebarOption title="Search" Icon={SearchIcon} />
      <SidebarOption title="Your Library" Icon={LibraryMusicIcon} />
      </div>
      <br />
      <div className="sidebar__lower">
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr className="sidebar__hr"/>
      <div className="sidebar__playlists">
        {playlists?.items?.map((playlist) => (
          <SidebarOption
            title={playlist.name}
            key={playlist.id}
            id={playlist.id}
          />
        ))}
      </div>
      </div>
    </div>
  );
}

export default Sidebar;
