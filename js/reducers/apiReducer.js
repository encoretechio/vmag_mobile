import { GET_POSTS, GET_PHOTOS } from '../actions/api';

export type State = {
    posts: array,
    photos: array
}

const initialState = {
  posts: [],
  photos:[]
};

export default function apiReducer(state:State = initialState , action) {

  if (action.type === GET_POSTS) {
          return {
            ...state,
            posts: action.data,
          };
  }

  if (action.type === GET_PHOTOS) {
          return {
            ...state,
            photos: action.data,
          };
  }

  return state;
}
