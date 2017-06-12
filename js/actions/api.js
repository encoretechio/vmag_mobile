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

export const ADD_LIKE_SUCCESS = "ADD_LIKE_SUCCESS";
export const REMOVE_LIKE_SUCCESS = "REMOVE_LIKE_SUCCESS";
export const REMOVE_FAVORITE_VIDEO_SUCCESS = "REMOVE_FAVORITE_VIDEO_SUCCESS";

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
  //console.log("Login " + username + " " + password)
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
            //console.log("login success");
            //console.log(data);
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
          //console.log("loaded final issue success");
          //console.log(issue);
          dispatch(setUserData(issue));
          //console.log(getState());
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
    return fetch(BASE_URL + "comment/video/" + videoId, GET_CONFIGS(state))
      .then(res => res.json())
      .then(
        comments => {
          dispatch(fetchCommentsSuccess(comments))
        },
        error => dispatch(connectionError())
      );
  }
};

export const addComment = (userId, videoId, text) => {
  return (dispatch, getState) => {
    const state = getState();
    return fetch(BASE_URL + "comment", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + state.data.token
      },
      body: JSON.stringify({
        video: videoId,
        author: userId,
        text: text
      })
    })
      .then(res => res.json())
      .then(
        comment => {
          //console.log("Added comment");
          //console.log(comment);
          // Todo Fix this here
          dispatch(fetchComments(videoId))
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
      // ...POST_CONFIGS(state),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + state.data.token
      },
      body: JSON.stringify([videoId])
    })
      .then(res => res.json())
      .then(
        watched => {
          //console.log("Updated watched videos");
          //console.log(watched);
          dispatch(addWatchedVideoSuccess(watched));
        },
        error => dispatch(connectionError())
      );
  }
};


// Success adding vidoe for favorite list
export const addFavoriteVideoSuccess = (video) => {
  return {
    type: ADD_FAVORITE_VIDEO_SUCCESS,
    video: video
  }
};

export const addFavoriteVideo = (userId, videoId) => {
  return (dispatch, getState) => {
    const state = getState();
    console.log(videoId);
    return fetch(BASE_URL + "user/"+userId+"/add_favorite_videos", {
      // ...POST_CONFIGS(state),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + state.data.token
      },
      body: JSON.stringify([videoId])
    })
      .then(res => res.json())
      .then(
        favorite => {
          dispatch(addFavoriteVideoSuccess(favorite));
        },
        error => dispatch(connectionError())
      );
  }
};


// Success removing video from favorite list
export const removeFavoriteVideoSuccess = (video) => {
  return {
    type: REMOVE_FAVORITE_VIDEO_SUCCESS,
    video: video
  }
};

export const removeFavoriteVideo = (userId, videoId) => {
  return (dispatch, getState) => {
    const state = getState();
    console.log(videoId);
    return fetch(BASE_URL + "user/"+userId+"/remove_favorite_videos", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + state.data.token
      },
      body: JSON.stringify([videoId])
    })
      .then(res => res.json())
      .then(
        favorite => {
          dispatch(removeFavoriteVideoSuccess(favorite));
        },
        error => dispatch(connectionError())
      );
  }
};


// Success liking a video
export const addLikeSuccess = (video) => {
  return {
    type: ADD_LIKE_SUCCESS,
    video: video
  }
};

export const addLike = (userId, video) => {
  const videoId = video.id;
  return (dispatch, getState) => {
    dispatch(addLikeSuccess({...video,isLiked:true}));

    const state = getState();
    console.log("addLike action: ", videoId);
    //dispatch(addLikeSuccess({id:videoId}));
    return fetch(BASE_URL + "video/"+videoId+"/like", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + state.data.token
      },
      body: JSON.stringify([videoId])
    })
      .then(res => res.json())
      .then(
        videoNew => {
          dispatch(addLikeSuccess(videoNew));
        },
        error =>
        {
          dispatch(connectionError())
          dispatch(removeLikeSuccess(video));
        }
      );
  }
};

// Success removing like
export const removeLikeSuccess = (video) => {
  return {
    type: REMOVE_LIKE_SUCCESS,
    video: video
  }
};

export const removeLike = (userId, video) => {
  return (dispatch, getState) => {
    const videoId = video.id;
    dispatch(removeLikeSuccess({...video,isLiked:false}));
    const state = getState();
    console.log("removeLike action: ", videoId);
    //dispatch(removeLikeSuccess({id:videoId}));
    return fetch(BASE_URL + "video/"+videoId+"/unlike", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + state.data.token
      },
      body: JSON.stringify([videoId])
    })
      .then(res => res.json())
      .then(
        videoNew => {
          dispatch(removeLikeSuccess(videoNew));
        },
        error =>
        {
          dispatch(connectionError());
          dispatch(addLikeSuccess(video));
        }
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
