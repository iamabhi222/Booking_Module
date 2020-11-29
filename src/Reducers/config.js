import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_ROOMS":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case "FETCH_ROOM":
      return { ...state, [action.payload.id]: action.payload };
    case "ADDRESS":
      return { ..._.mapKeys(action.payload, "id") };
    case "ROOMS":
      return { ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
