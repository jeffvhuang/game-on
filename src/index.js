import '@babel/polyfill';
import '../web.config';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './shared/redux/configureStore';
import 'antd/dist/antd.less';
import './styles/main.less';
import App from "./shared/App.js";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
), document.getElementById("root"));