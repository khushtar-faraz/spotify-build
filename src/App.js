import { useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import { getTokenFromResponseUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useStatevalue } from "./context/react-context";
import Player from "./components/Player";

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useStatevalue();
  useEffect(() => {
    dispatch({
      type: "SET_SPOTIFY",
      spotify: spotify,
    });
  }, []);

  useEffect(() => {
    const hashPart = getTokenFromResponseUrl();
    window.location.hash = "";
    console.log(hashPart);
    const _token = hashPart.access_token;

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        console.log("PLAYLISTS ARE >>>", playlists);
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });

      spotify.getPlaylist("359ATGr5TbzqSoeVlf3ui5").then((response) => {
        dispatch({
          type: "SET_CURRENT_PLAYLIST",
          currentPlaylist: response,
        });
      });
    }
  }, []);
  console.log("USER IS >>>", user);
  console.log("TOKEN IS >>>", token);
  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
