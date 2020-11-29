import booking from "../api/booking";
import history from "../helper/history";
var moment = require("moment-timezone");

export const signIn = (userId) => {
  return {
    type: "SIGN_IN",
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const fetchRooms = () => {
  return async (dispatch) => {
    const { data } = await booking.get("/Available");

    dispatch({
      type: "FETCH_ROOMS",
      payload: data,
    });
  };
};

export const fetchRoom = (id) => {
  return async (dispatch) => {
    const { data } = await booking.get(`/Available/${id}`);

    dispatch({
      type: "FETCH_ROOM",
      payload: data,
    });
  };
};

export const queryRooms = ({ address, from, to, rooms }) => {
  const sday = moment.tz(from, "Asia/Calcutta").format("DD");
  const smonth = moment.tz(from, "Asia/Calcutta").format("MM");
  const eday = moment.tz(to, "Asia/Calcutta").format("DD");
  const emonth = moment.tz(to, "Asia/Calcutta").format("MM");

  return async (dispatch) => {
    const { data } = await booking.get(
      `/Available?address_like=${address}&rooms_gte=${rooms}`
    );

    const result = data.filter((filter) => {
      if (
        moment.tz(filter.from, "Asia/Calcutta").format("MM") < smonth &&
        moment.tz(filter.to, "Asia/Calcutta").format("MM") > emonth
      ) {
        return true;
      } else if (
        moment.tz(filter.from, "Asia/Calcutta").format("MM") == smonth &&
        moment.tz(filter.to, "Asia/Calcutta").format("MM") == emonth
      ) {
        if (
          moment.tz(filter.from, "Asia/Calcutta").format("DD") <= sday &&
          moment.tz(filter.to, "Asia/Calcutta").format("DD") >= eday
        ) {
          return true;
        } else return false;
      } else if (
        moment.tz(filter.from, "Asia/Calcutta").format("MM") == smonth &&
        moment.tz(filter.to, "Asia/Calcutta").format("MM") > emonth
      ) {
        if (moment.tz(filter.from, "Asia/Calcutta").format("DD") <= sday) {
          return true;
        } else return false;
      }
    });

    dispatch({
      type: "ADDRESS",
      payload: result,
    });

    history.push("/search");
  };
};

export const checkout = (Values) => {
  return async (dispatch) => {
    const { data } = await booking.post("/Booking", { ...Values });
    const result = await booking.get(`/Available/${Values.bookingId}`);
    if (result.data.rooms - data.rooms >= 0) {
      const update = await booking.patch(`/Available/${Values.bookingId}`, {
        rooms: result.data.rooms - data.rooms,
      });
      history.push(`/profile/${Values.userId}`);
    } else {
      history.push("/error");
    }
  };
};

export const search = ({ address, from, to, rooms }) => {
  return {
    type: "SEARCH",
    payload: {
      address,
      from,
      to,
      rooms,
    },
  };
};

export const UserBooking = (userId) => {
  return async (dispatch) => {
    const { data } = await booking.get(`/Booking?userId=${userId}`);
    dispatch({
      type: "CHECKOUT",
      payload: data,
    });
  };
};
