
import { combineReducers } from 'redux';

import drawer from './drawer';
import routes from './routes';
import cardNavigation from './cardNavigation';
import apiReducer from './apiReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
  drawer,
  cardNavigation,
  routes,
  data:apiReducer,
  loading:loadingReducer
});
