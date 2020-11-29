import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import roomReducer from "./config";
import query from "./searchQuery";
import checkout from "./checkout";
export default combineReducers({
  auth: authReducer,
  rooms: roomReducer,
  query,
  checkout,
});
