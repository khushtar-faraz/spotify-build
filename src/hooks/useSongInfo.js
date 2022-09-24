import { useEffect, useState } from "react";
import { useStatevalue } from "../context/react-context";

function useSongInfo() {
  const [{ spotify, playingTrackId }] = useStatevalue();
  const [songInfo, setSongInfo] = useState(null);
  useEffect(() => {
    const fetchSongInfo = async () => {
      if (playingTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${playingTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotify.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());
        setSongInfo(trackInfo);
      }
    };
    fetchSongInfo();
  }, [playingTrackId, spotify]);
//   console.log(songInfo);
  return songInfo;
}

export default useSongInfo;
