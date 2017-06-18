/**
 * Created by janaka on 6/4/17.
 */
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';

import Toast from '@remobile/react-native-toast'
export const SET_CURRENT_VIDEO = 'SET_CURRENT_VIDEO';
export const LOAD_LOCAL_DATA_SUCCESS = 'LOAD_LOCAL_DATA_SUCCESS';
export const STORAGE_KEY = 'local_data_storage';

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


export function saveLocalData(data):Action {
  return (dispatch) => {
    // Toast.showShortBottom("Saving Data", JSON.stringify(data));
    AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(data)).then(()=>{
      // Toast.showShortBottom("Save Success");
    }).catch((err)=>{
      Toast.showShortBottom("Save Failed");
    })
  }
}

export function loadLocalDataSuccess(data):Action {
  return {
    type:LOAD_LOCAL_DATA_SUCCESS,
    data:data
  }
}

export function loadLocalData():Action {
  return (dispatch) => {
    AsyncStorage.getItem(STORAGE_KEY).then((data)=>{
      if(data){
        dispatch(loadLocalDataSuccess(JSON.parse(data)));
        // Toast.showShortBottom("Load Success:", data);
        Actions['home']();
      }
      else{
        // Toast.showShortBottom("Load Failed");
        Actions['login']();
      }
    })
  }
}


export function logout():Action {
  return (dispatch) => {
    AsyncStorage.removeItem(STORAGE_KEY).then(()=>Toast.showShortBottom("Deleted Local Data."));
    Actions['login']();
  }
}