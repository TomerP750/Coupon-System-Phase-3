import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Layout} from "./Components/LayoutArea/Layout/Layout";
import {BrowserRouter} from "react-router-dom";
import axios from "axios";

// make axios add the token (if found) to the request header
axios.interceptors.request.use(function (config) {
    if (localStorage.my_token) { // if token exists
        config.headers.Authorization = "Bearer " + localStorage.my_token;
    }
    return config;
});



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Layout/>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
