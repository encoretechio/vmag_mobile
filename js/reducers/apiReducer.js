import {GET_POSTS, GET_PHOTOS, LOGIN_SUCCESS, SET_USER_DATA} from '../actions/api';

import sampleData from './sampleData.json';

export type State = {
  posts: array,
  photos: array
}

const initialState = {
  posts: [],
  photos: []
};

export default function apiReducer(state: State = initialState, action) {

  if (action.type === GET_POSTS) {
    return {
      ...state,
      posts: action.data,
      company: sampleData.company,
      cover: sampleData.cover,
      playlists: sampleData.playlists
    };
  }

  if (action.type === GET_PHOTOS) {
    return {
      ...state,
      photos: action.data,
    };
  }
  if (action.type === LOGIN_SUCCESS) {
    console.log(action.data.token)
    return {
      ...state,
      user: action.data.user,
      token: action.data.token
    }
  }
  if(action.type === SET_USER_DATA) {
    return {
      ...state,
      userData:action.data
    }
  }

  return state;
}
