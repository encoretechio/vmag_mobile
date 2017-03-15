export const GET_POSTS = 'GET_POSTS';
export const GET_PHOTOS = 'GET_PHOTOS';

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
        data => dispatch(setPhotosData(data)),
        //error => dispatch(errorHandlingFunction())
      );
  };
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
