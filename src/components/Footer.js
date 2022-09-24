import React, { useCallback, useEffect, useState } from "react";
import "./Footer.css";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import Grid from "@mui/material/Grid";
import useSongInfo from "../hooks/useSongInfo";
import { useStatevalue } from "../context/react-context";
import { debounce } from "lodash";

function Footer() {
  const songInfo = useSongInfo();
  const [{ spotify, playingTrackId, isPlaying }, dispatch] = useStatevalue();
  const [volume, setVolume] = useState(50);
  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotify.getMyCurrentPlayingTrack().then((data) => {
        console.log(data);
        dispatch({
          type: "SET_PLAYINGTRACK_ID",
          playingTrackId: data?.body?.item?.id,
        });
        spotify.getMyCurrentPlaybackState().then((data) => {
          dispatch({
            type: "SET_IS_PLAYING",
            isPlaying: data?.body?.is_playing,
          });
        });
      });
    }
  };

  const handlePlayPause = () => {
    spotify.getMyCurrentPlaybackState().then((data) => {
      console.log(data);
      if (data?.body?.is_playing) {
        spotify.pause();
        dispatch({ type: "SET_IS_PLAYING", isPlaying: false });
      } else {
        spotify.play();
        dispatch({
          type: "SET_IS_PLAYING",
          isPlaying: true,
        });
      }
    });
  };
  useEffect(() => {
    if (spotify.getAccessToken() && !playingTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [spotify, playingTrackId]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotify.setVolume(volume).catch((error) => {
        console.log(error);
      });
    }, 500),
    []
  );

  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src={songInfo?.album?.images[0]?.url}
          alt=""
        />
        <div className="footer__songInfo">
          <h4>{songInfo?.name}</h4>
          <p>{songInfo?.artists[0]?.name}</p>
        </div>
      </div>
      <div className="footer__center">
        <ShuffleIcon />
        <SkipPreviousIcon className="footer__icon" />
        {!isPlaying ? (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        )}
        <SkipNextIcon className="footer__icon" />
        <RepeatIcon />
      </div>
      <div className="footer__right">
        <Grid container spacing={2} className="grid__volume">
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item>
            <input
              onChange={(e) => setVolume(Number(e.target.value))}
              type="range"
              min="0"
              max="100"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
