// import logo from './logo.svg';
// import './App.css';

// const clientId = '4992ddaf29794b0ebb4f4eb1d49a5642';
// const clientSecret = '85160e6a78524ba283cb2bf79ac37012';
// var accessToken = '';

// const querystring = require('querystring');
// function GetSpotifyAuthCode() {
//   window.location.assign('https://accounts.spotify.com/authorize?' + 
//     querystring.stringify({
//       response_type: 'code',
//       client_id: clientId,
//       scope: 'user-library-read user-top-read playlist-read-private',
//       redirect_uri: 'http://localhost:3000/callback',
//       state: '1231231231123123',
//     })
//   );  
// }

// function GetSpotifyAccessToken(code, state) {
//   console.log("spotify access token req")
//   if (code === null || state === null) {
//     console.log("error getting access token, code or state was null")
//     return
//   }
//   const xhr = new XMLHttpRequest() 
//   xhr.open("POST", "https://accounts.spotify.com/api/token")
//   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
//   xhr.setRequestHeader("Authorization", "Basic " + btoa(clientId + ":" + clientSecret))
//   xhr.send(querystring.stringify({code: code, redirect_uri: "http://localhost:3000/callback", grant_type: "authorization_code"}))
//   xhr.onload = function() {
//     console.log(xhr.status)
//     console.log(xhr.response)
//     if (xhr.response == 200) {
//       accessToken = xhr.response["access_token"]
//     }
//     // console.log(xhr.response["access_token"])
//     // if (xhr.response.access_token !== undefined) {
//     //   accessToken = xhr.response.access_token
//     //   console.log("Got valid access token.")
//     // }
//   }
// }

// // function App() {
// //   const path = window.location.pathname
// //   if (path === "/callback") {
// //     const urlParams = new URLSearchParams(window.location.search)
// //     const code = urlParams.get('code')
// //     const state = urlParams.get('state')
// //     const err = urlParams.get('error')
// //     if (err != null) {
// //       console.log(err)
// //     }
// //     if (code !== null && state !== null && err === null) {
// //       GetSpotifyAccessToken(code, state)
// //     }
// //   }

// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <p className="token">
// //           (token will go here after login)
// //         </p>
// //         <button onClick={GetSpotifyAuthCode}>Login to Spotify</button>
// //       </header>
// //     </div>
// //   );
// // }

// export default App;
