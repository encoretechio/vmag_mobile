import {
  GET_POSTS,
  GET_PHOTOS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CONNECTION_ERROR,
  SET_FINAL_ISSUE,
  ADD_FAVORITE_VIDEO_SUCCESS,
  REMOVE_FAVORITE_VIDEO_SUCCESS,
  ADD_WATCHED_VIDEO_SUCCESS,
  ADD_LIKE_SUCCESS,
  REMOVE_LIKE_SUCCESS,
  FETCH_COMMENTS_SUCCESS
} from '../actions/api';

import {SET_CURRENT_VIDEO} from '../actions/local'

import sampleData from './sampleData.json';

export type State = {
  posts: array,
  photos: array
}

const initialState = {
  posts: [],
  photos: [],
  //user: { videoComments :['XYZ']},
  currentVideo : { comments:[]}
};

export default function dataReducer(state: State = initialState, action) {

  // ////console.log(action);
  // ////console.log("______________________________________");
  // ////console.log(state);
  // ////console.log("______________________________________");
  // ////console.log("______________________________________");
  if (action.type === GET_POSTS) {
    return {
      ...state,
      // posts: action.data,
      // company: sampleData.company,
      // cover: sampleData.cover,
      // playlists: sampleData.playlists
    };
  }

  if (action.type === GET_PHOTOS) {
    return {
      ...state,
      // photos: action.data,
    };
  }
  if (action.type === LOGIN_SUCCESS) {
    ////console.log(action.data.token)
    return {
      ...state,
      connectionError: false,
      loginError: false,
      user: action.data.user,
      token: action.data.token,
    }
  }
  if (action.type === LOGIN_FAIL) {
    ////console.log(action.data.token)
    return {
      ...state,
      loginError: true
    }
  }
  if (action.type === CONNECTION_ERROR) {
    ////console.log(action.data.token)
    return {
      ...state,
      connectionError: true
    }
  }
  if (action.type === SET_FINAL_ISSUE) {
    return {
      ...state,
      finalIssue: action.data,
      cover: action.data.cover_video,
      playlists: action.data.playlists,
      connectionError: false,
    }
  }
  if (action.type === ADD_WATCHED_VIDEO_SUCCESS) {
    return {
      ...state,
      user: {...state.user, watchedVideos:action.watchedVideos}
    }
  }
  if (action.type === ADD_FAVORITE_VIDEO_SUCCESS) {
    console.log('AddFavSuccess Reducer: ',action.video);
    return {
      ...state,
      currentVideo:action.video,
      playlists:state.playlists.map(
        (p)=>
        ({...p,videos:p.videos.map(
          (v)=>
          ({...v,isFavourite:v.id===action.video.id?action.video.isFavourite:v.isFavourite})) //
      }))
    }
  }
  if (action.type === REMOVE_FAVORITE_VIDEO_SUCCESS) {
    console.log('RemoveFavSuccess Reducer: ',action.video);
    return {
      ...state,
      currentVideo:action.video,
      playlists:state.playlists.map(
        (p)=>
        ({...p,videos:p.videos.map(
          (v)=>
          ({...v,isFavourite:v.id===action.video.id?action.video.isFavourite:v.isFavourite})) //v.id==action.video.id?action.video.isLiked:v.isLiked
      }))
    }
  }
  if (action.type === ADD_LIKE_SUCCESS) {
    console.log('LikeSuccess Reducer: ',action.video);
    return {
      ...state,
      currentVideo:action.video,
      playlists:state.playlists.map(
        (p)=>
        ({...p,videos:p.videos.map(
          (v)=>
          ({...v,isLiked:v.id===action.video.id?action.video.isLiked:v.isLiked})) //
      }))
    }
  }
  if (action.type === REMOVE_LIKE_SUCCESS) {
    console.log('RemoveSuccess Reducer: ',action.video);
    return {
      ...state,
      currentVideo:action.video,
      playlists:state.playlists.map(
        (p)=>
        ({...p,videos:p.videos.map(
          (v)=>
          ({...v,isLiked:v.id===action.video.id?action.video.isLiked:v.isLiked})) //v.id==action.video.id?action.video.isLiked:v.isLiked
      }))
    }
  }
  if (action.type === FETCH_COMMENTS_SUCCESS) {
    return {
      ...state,
      currentVideo: {...state.currentVideo, comments:action.comments}
    }
  }

  if(action.type===SET_CURRENT_VIDEO){
    return {
      ...state,
      currentVideo:action.video
    };
  }

  return state;
}
