import '@babel/polyfill';
import '../web.config';
import React from "react";
import ReactDOM from "react-dom";
import 'antd/dist/antd.less';
import './styles/main.less';
import App from "./shared/App.js";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById("root"));