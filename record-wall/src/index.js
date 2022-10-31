import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginPage from './login';
import PosterPage from './poster';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

// import reportWebVitals from './reportWebVitals';

// var accessToken = "";

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

var accessToken = ""
export default function App() {
  const loginPage = <LoginPage onAccessToken={
    (token) => {
      accessToken = token;
      console.log("Got token.")
      window.location.replace(window.location.protocol + "//" + window.location.host + "/poster")
    }
  }></LoginPage>
  const posterPage = <PosterPage></PosterPage>
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={loginPage}/>
        <Route path="/login" element={loginPage}/>
        <Route path="/callback" element={loginPage}/>
        <Route path="/poster" element={posterPage}/>
        <Route path="*" element={"Not found"}/>
      </Routes>
    </Router>
  ) 
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);