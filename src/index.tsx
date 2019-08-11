import '../web.config';
import * as React from "react"
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import configureStore from './shared/redux/configure-store';
import 'antd/dist/antd.less';
import './styles/main.scss';
import App from "./shared/App";
import { BrowserRouter } from 'react-router-dom';

const store = configureStore(undefined);

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
), document.getElementById("root") as HTMLElement);