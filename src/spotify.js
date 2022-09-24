export const authenticationEndPoint = "https://accounts.spotify.com/authorize";
const redirectUri = "https://spotify-clone-e63a7.web.app";
const clientId = "457e4cfed6304c5a8bb28cc0cd9b0b15";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromResponseUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((prev, curr) => {
      var parts = curr.split("=");
      prev[parts[0]] = decodeURIComponent(parts[1]);
      return prev;
    }, {});
};

// let params = new URLSearchParams({
//   client_id: clientId,
//   redirect_uri: redirectUri,
//   scope: scopes.join("%20"),
//   response_type: "token",
//   show_dialog: "true",
// });

export const loginUrl = `${authenticationEndPoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

// export const loginUrl = `${authenticationEndPoint}?${params.toString()}`;

// export const loginUrl =
// "https://accounts.spotify.com/authorize?" + params.toString();
