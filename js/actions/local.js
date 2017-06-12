/**
 * Created by janaka on 6/4/17.
 */
import {Actions} from 'react-native-router-flux';

export const SET_CURRENT_VIDEO = 'SET_CURRENT_VIDEO';

export function setCurrentVideo(video):Action {
  return {
    type: SET_CURRENT_VIDEO,
    video:video
  };
}

export function  navigateToVideo(video):Action {
  return (dispatch) => {
    dispatch(setCurrentVideo(video));
    Actions.video();
  }
}
