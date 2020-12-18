import _ from "lodash";

const config = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_ROOMS":
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case "FETCH_ROOM":
      return { ...state, [action.payload._id]: action.payload };
    case "ADDRESS":
      return { ..._.mapKeys(action.payload, "_id") };
    case "ROOMS":
      return { ..._.mapKeys(action.payload, "_id") };
    default:
      return state;
  }
};

export default config;
