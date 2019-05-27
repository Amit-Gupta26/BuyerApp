/** @format */

import {AppRegistry} from 'react-native';
import App from './src/OwnersApp';
import {name as appName} from './app.json';
import axios from 'axios';

AppRegistry.registerComponent(appName, () => App);
axios.defaults.baseURL = "https://www.owners.com";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.timeout = 25000;
axios.interceptors.request.use(
  request => {
    console.log(request);
    return request;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
    console.log(response);
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
