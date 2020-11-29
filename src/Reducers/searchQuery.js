var moment = require("moment-timezone");

const date = moment.tz("Asia/Calcutta").format("YYYY-MM-DD");

export default (
  state = { query: { from: date, to: date, rooms: 0 } },
  action
) => {
  switch (action.type) {
    case "SEARCH":
      return { ...state, query: action.payload };
    default:
      return state;
  }
};
