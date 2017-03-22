import {Actions} from 'react-native-router-flux';

export const GET_POSTS = 'GET_POSTS';
export const GET_PHOTOS = 'GET_PHOTOS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const SET_USER_DATA = 'SET_USER_DATA'

const base_url = "http://52.36.197.150/";

export function setPostsData(data) {
  return {
    type: GET_POSTS,
    data
  };
}

export function setPhotosData(data) {
  return {
    type: GET_PHOTOS,
    data
  };
}

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data
  }
}

export const setUserData = (data) => {
  return {
    type: SET_USER_DATA,
    data
  }
}


export function getPosts() {
  return function (dispatch) {
    return fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then(res => res.json())
      .then(
        data => dispatch(setPostsData(data)),
        //error => dispatch(errorHandlingFunction())
      );
  };
}

export function getPhotos() {
  return function (dispatch) {
    return fetch(`https://jsonplaceholder.typicode.com/photos`)
      .then(res => res.json())
      .then(
        data => {
          dispatch(setPhotosData(data))
        },
        //error => dispatch(errorHandlingFunction())
      );
  };
}

export const login = (username, password) => {
  console.log("Login "+username+" "+ password)
  return (dispatch) => {
    return fetch(
      base_url + "login",
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // email: 'wathsalaruberu@gmail.com',
          // password: '123456'
          email: username,
          password: password
        })
      }
    ).then(res => res.json())
      .then(
        data => {
          console.log("login success");
          dispatch(loginSuccess(data))
          dispatch(loadUserData())
          // dispatch(navigateTo('button', 'home'))
          Actions['home']();
        }
      );
  }
}

export const loadUserData = () => {
  return (dispatch, getState) => {
    const state = getState();
    return fetch(base_url + "userprofile/" + state.data.user.id,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': ('Bearer ' + state.data.token)
        }
      }
    )
      .then(res => res.json())
      .then(
        data => {
          console.log(data);
          dispatch(setUserData(data))
        },
        //error => dispatch(errorHandlingFunction())
      );
  }
}

/*
 export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

 export function increment() {
 return {
 type: INCREMENT_COUNTER
 };
 }

 export function incrementAsync() {
 return dispatch => {
 setTimeout(() => {
 // Yay! Can invoke sync or async actions with `dispatch`
 dispatch(increment());
 }, 2000);
 };
 }


 export function loadData() { // needs to dispatch, so it is first argument
 return fetch(`https://jsonplaceholder.typicode.com/posts`)
 .then(res => res.json())
 .then(
 data => dispatch(increment()),
 err => dispatch(increment())
 );
 }


 function fetchSecretSauce() {
 return fetch('https://jsonplaceholder.typicode.com/posts');
 }
 */

/*
 import fetch from 'isomorphic-fetch'

 export const REQUEST_POSTS = 'REQUEST_POSTS'
 function requestPosts(subreddit) {
 return {
 type: REQUEST_POSTS,
 subreddit
 }
 }

 export const RECEIVE_POSTS = 'RECEIVE_POSTS'
 function receivePosts(subreddit, json) {
 return {
 type: RECEIVE_POSTS,
 subreddit,
 posts: json.data.children.map(child => child.data),
 receivedAt: Date.now()
 }
 }

 function fetchPosts(subreddit) {
 return dispatch => {
 dispatch(requestPosts(subreddit))
 return fetch(`https://www.reddit.com/r/${subreddit}.json`)
 .then(response => response.json())
 .then(json => dispatch(receivePosts(subreddit, json)))
 }
 }
 */
