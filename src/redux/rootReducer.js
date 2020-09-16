import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import videoReducer from "./reducers/videoReducer";
import playlistReducer from "./reducers/playlistReducer";
import loaderReducer from './reducers/loaderReducer'
export default combineReducers({
  userState: userReducer,
  videoState: videoReducer,
  playlistState: playlistReducer,
  loaderState: loaderReducer
});
