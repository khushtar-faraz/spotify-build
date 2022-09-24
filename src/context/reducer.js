export const initialState = {
  playlists: [],
  user: null,
  // item: null,
  // playing: false,
  spotify: null,
  playlistId: null,
  playingTrackId: null,
  isPlaying:false,
  // currentPlaylist: null,
  // token:
  //   "BQAG3dHMzB2vPZKbNoxSvOWnt_D6CbAwymRotgIU639nRwlkclPSSNbBOvIGMVri2oNYYFLpn46Gu93mtnwwgsg1t3husyAIIlUvWPxeA8Tx1YTp5umhviL0zfjT2avSyRErZOHaUyNoPAJwx5FtONvWRC5b-tnZnfhpw6d3ILQgcI4FrMVQ",
};

export const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };

    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };

    case "SET_SPOTIFY":
      return {
        ...state,
        spotify: action.spotify,
      };
    case "SET_PLAYLIST_ID":
      return {
        ...state,
        playlistId: action.playlistId,
      };
    case "SET_CURRENT_PLAYLIST":
      return {
        ...state,
        currentPlaylist: action.currentPlaylist,
      };
    case "SET_PLAYINGTRACK_ID":
      return {
        ...state,
        playingTrackId: action.playingTrackId,
      };
    case "SET_IS_PLAYING":
      return {
        ...state,
        isPlaying: action.isPlaying,
      };
    default:
      return state;
  }
};
