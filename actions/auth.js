import C from '../constants';
import {AsyncStorage} from 'react-native';
let baseURL = C.SERVER_URL;

import request from '../services/request';
import userActions from './users';


const onLogin = (values) => {
  console.log('VALUESSSS: ', values);
  let qs = "";
  qs = Object.keys(values).map(key => {
    let value = values[key];
    if (key=='place') {
      value = JSON.stringify(values[key]);
    }
    return encodeURIComponent(key) + '=' + encodeURIComponent(value);
  }).join('&');
  console.log('qs : ', qs);

  return function(dispatch, getState){
    dispatch({type: C.LOGIN_REQUEST});
    return request({url: baseURL + "/api/login", method: "POST", data: qs})
      .then((res) =>
        {
          var data = JSON.parse(res);
          console.log('RESPONSEEEE: ', data);
          if (data.token) {

        try {
          AsyncStorage.setItem('auth', JSON.stringify({
            'token': data.token,
            'expires': data.expires,
            'user': data.user
          }));
        } catch (error) {
          // Error saving data
        }
          dispatch({type: C.LOGIN_SUCCESS, data: JSON.parse(res)});

          } else {
            dispatch({type:C.LOGIN_FAILURE, errorMsg: "Incorrect username or password"});
          }
          return 'xdata';
        })
        .then((error) => {
          return error;
      });
  }
}

const onRegister = (values) => {
  let qs = "";
  qs = Object.keys(values).map(key => {
    let value = values[key];
    if (key=='place') {
      value = JSON.stringify(values[key]);
    }
    return encodeURIComponent(key) + '=' + encodeURIComponent(value);
  }).join('&');
  console.log('qs : ', qs);

  return function(dispatch, getState){
    dispatch({type: C.REGISTER_REQUEST});
    return request({url: baseURL + "/api/register", method: "POST", data: qs})
      .then((res) =>
        {
          var data = JSON.parse(res);
          if (data.sucessful==true) {
            dispatch({type:C.REGISTER_SUCCESS, data: JSON.parse(res)});
          } else {

            dispatch({type:C.REGISTER_FAILURE, data: JSON.parse(res)});
          }
        })
        .then((error) => {

            dispatch({type:C.REGISTER_FAILURE, data: {}});
        });
  }
}

const onLogout = () => {
  AsyncStorage.clear();
  return({
      type: C.LOGOUT,
    });
  }
var checkLocalAuthState = () => {
  return function(dispatch){
    AsyncStorage.getItem('auth')
      .then(async (auth) => {
        if (!auth) {
          dispatch({type: C.LOGIN_ANONYMOUS});
          return
        }
        const json = JSON.parse(auth);
        console.log(json);
        dispatch({
        type: C.LOGIN_SUCCESS,
        data: {
          user: json.user,
          token: json.token,
          expires: json.expires
        }
      });
    });
    return;
  }
}

const resetRegistrationStatus = () => {
  return function(dispatch) {
    dispatch({type: C.REGISTER_RESET});
  }
}
const resetLoginStatus = () => {
  return function(dispatch) {
    dispatch({type: C.LOGIN_RESET});
  }
}

export default {onRegister, onLogin, onLogout, checkLocalAuthState, resetRegistrationStatus, resetLoginStatus};
