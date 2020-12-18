var moment = require("moment-timezone");

const date = moment.tz("Asia/Calcutta").format("YYYY-MM-DD");
const dateTwo = moment().add(1, "day").endOf("day").format("YYYY-MM-DD");

const query = (
  state = { query: { from: date, to: dateTwo, rooms: 1 } },
  action
) => {
  switch (action.type) {
    case "SEARCH":
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export default query;
