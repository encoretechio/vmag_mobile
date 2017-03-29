import {START_SPINNER, STOP_SPINNER} from '../actions/loading';

const initialState = {

};

export default function loadingReducer(state: State = initialState, action) {

  if(action.type === START_SPINNER) {
    return {
      ...state,
      isLoading:true
    }
  }

  if(action.type === STOP_SPINNER) {
    return {
      ...state,
      isLoading:false
    }
  }

  return state;
}