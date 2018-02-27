// Startup point for the client side application
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import Routes from './Routes';
import reducers from './reducers';
import '../scss/base.scss';

const axiosInstance = axios.create({
  baseURL: 'http://dev-west-api.content.co/api/v1/'
});

const loggerMiddleware = createLogger();
let middleWareList = applyMiddleware(thunkMiddleware, loggerMiddleware, thunk.withExtraArgument(axiosInstance));
const store = createStore(
  reducers,
  window.INITIAL_STATE,
  middleWareList
);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
