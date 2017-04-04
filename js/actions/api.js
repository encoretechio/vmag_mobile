import {Actions} from 'react-native-router-flux';

// base url for backend
const BASE_URL = "http://52.36.197.150:1337/";
const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
const GET_CONFIGS = (state) => {
  return {
    method: 'GET',
    headers: {
      ...HEADERS,
      'authorization': ('Bearer ' + state.data.token)
    }
  }
};

const POST_CONFIGS = (state) => {
  return {
    method: 'POST',
    headers: {
      ...HEADERS,
      'authorization': ('Bearer ' + state ? state.data.token : "")
    }
  }
};

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const SET_FINAL_ISSUE = 'SET_FINAL_ISSUE';
export const CONNECTION_ERROR = 'CONNECTION_ERROR';
export const ADD_WATCHED_VIDEO_SUCCESS = "ADD_WATCHED_VIDEO_SUCCESS";
export const ADD_FAVORITE_VIDEO_SUCCESS = "ADD_FAVORITE_VIDEO_SUCCESS";
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';

// To be use to indicate connection failure.
export const connectionError = () => {
  return {
    type: CONNECTION_ERROR
  }
};

// dispatch after login request was success. dispatch by login()
export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data
  }
};

// dispatch if the login request fail. Username, pwd invalid. dispatch by login()
export const loginFail = () => {
  return {
    type: LOGIN_FAIL
  }
};

// dispatched when user click login button.
// send backend call to login. If succeed it will dispatch loginSuccess() or loginFail()
export const login = (username, password) => {
  console.log("Login " + username + " " + password)
  return (dispatch) => {
    return fetch(
      BASE_URL + "login",
      {
        method: 'POST',
        HEADERS,
        body: JSON.stringify({
          email: username,
          password: password
        })
      }
    ).then(res => res.json())
      .then(
        data => {
          if (data.token) {
            console.log("login success");
            console.log(data);
            dispatch(loginSuccess(data));
            dispatch(loadFinalIssue());
            Actions['home']();
          }
          else {
            dispatch(loginFail());
          }
        },
        error => dispatch(connectionError())
      );
  }
};

// If final issues was loaded successfully. This will be called to set data in the redux store.
export const setUserData = (data) => {
  return {
    type: SET_FINAL_ISSUE,
    data
  }
};

// called after login to load final issue
export const loadFinalIssue = () => {
  return (dispatch, getState) => {
    const state = getState();
    return fetch(BASE_URL + "finalIssue/", GET_CONFIGS(state))
      .then(res => res.json())
      .then(
        issue => {
          console.log("loaded final issue success");
          console.log(issue);
          dispatch(setUserData(issue));
          console.log(getState());
        },
        error => dispatch(connectionError())
      );
  }
};


// Load comments for video
export const fetchCommentsSuccess = (comments) => {
  return {
    type: FETCH_COMMENTS_SUCCESS,
    comments
  }
};

// called after login to load final issue
export const fetchComments = (videoId) => {
  return (dispatch, getState) => {
    const state = getState();
    return fetch(BASE_URL + "video/" + videoId, GET_CONFIGS(state))
      .then(res => res.json())
      .then(
        video => {
          console.log("Fetched comments");
          console.log(video);
          dispatch(fetchCommentsSuccess(video.comments))
        },
        error => dispatch(connectionError())
      );
  }
};

export const addComment = (userId, videoId, text) => {
  return (dispatch, getState) => {
    const state = getState();
    return fetch(BASE_URL + "comment", {
      ...POST_CONFIGS(state),
      body: JSON.stringify({
        video: videoId,
        author: userId,
        text: text
      })
    })
      .then(res => res.json())
      .then(
        comment => {
          console.log("Added comment");
          console.log(comment);
          // Todo Fix this here
          dispatch(fetchCommentsSuccess([comment]))
        },
        error => dispatch(connectionError())
      );
  }
};


// Success adding vidoe for watched list
export const addWatchedVideoSuccess = (watchedVideos) => {
  return {
    type: ADD_WATCHED_VIDEO_SUCCESS,
    watchedVideos
  }
};
export const addWatchedVideo = (userId, videoId) => {
  return (dispatch, getState) => {
    const state = getState();
    return fetch(BASE_URL + "user/"+userId+"/add_watched_videos", {
      ...POST_CONFIGS(state),
      body: JSON.stringify([videoId])
    })
      .then(res => res.json())
      .then(
        watched => {
          console.log("Updated watched videos");
          console.log(watched);
          dispatch(addWatchedVideoSuccess(watched));
        },
        error => dispatch(connectionError())
      );
  }
};


// Success adding vidoe for favorite list
export const addFavoriteVideoSuccess = (favoriteVideos) => {
  return {
    type: ADD_FAVORITE_VIDEO_SUCCESS,
    favoriteVideos
  }
};
export const addFavoriteVideo = (userId, videoId) => {
  return (dispatch, getState) => {
    const state = getState();
    return fetch(BASE_URL + "user/"+userId+"/add_favorite_videos", {
      ...POST_CONFIGS(state),
      body: JSON.stringify([videoId])
    })
      .then(res => res.json())
      .then(
        favorite => {
          console.log("Favorite watched videos");
          console.log(favorite);
          dispatch(addFavoriteVideoSuccess(favorite));
        },
        error => dispatch(connectionError())
      );
  }
};



// ---------------------------------------------------------------------------------------------------------------------------------------------
// Bibi's old code. should be removed.
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
        data => {
          dispatch(setPhotosData(data))
        },
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
