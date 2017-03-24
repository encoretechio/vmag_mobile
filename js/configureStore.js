
import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducer from './reducers';
import promise from './promise';

import { getPosts, getPhotos} from './actions/api'

//noinspection JSAnnotator
export default function configureStore(onCompletion:()=>void):any {
  // const enhancer = compose(
  //   applyMiddleware(thunk, promise),
  //   devTools({
  //     name: 'nativebasekitchensink', realtime: true,
  //   }),
  // );

  const store = createStore(reducer,  applyMiddleware(thunk));
  // persistStore(store, { storage: AsyncStorage }, onCompletion);

  store.dispatch(getPosts())
  .then(() => {
    console.log('Posts Fetching Done!');
    //console.log(store.getState().data.posts[0]);
    //console.log(store.getState().data.posts.length);
  });

  store.dispatch(getPhotos())
  .then(() => {
    console.log('Photos Fetching Done!');
  });

  /*
  store.dispatch(selectSubreddit('reactjs'))
  store.dispatch(fetchPosts('reactjs')).then(() =>
    console.log(store.getState())
  )
  */
  return store;
}
