
import { combineReducers } from 'redux';

import drawer from './drawer';
import routes from './routes';
import cardNavigation from './cardNavigation';
import dataReducer from './dataReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
  drawer,
  cardNavigation,
  routes,
  data:dataReducer,
  loading:loadingReducer
});
