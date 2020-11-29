import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "CHECKOUT":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
