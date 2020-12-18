import { combineReducers } from "redux";
import auth from "./AuthReducer";
import rooms from "./config";
import query from "./searchQuery";
import checkout from "./checkout";
export default combineReducers({
  auth,
  rooms,
  query,
  checkout,
});
