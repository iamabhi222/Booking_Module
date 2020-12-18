import _ from "lodash";

const check = (state = {}, action) => {
  switch (action.type) {
    case "CHECKOUT":
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case "DELETE_BOOKING":
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default check;
