import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "CHECKOUT":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case "DELETE_BOOKING":
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
