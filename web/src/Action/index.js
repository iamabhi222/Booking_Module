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
  return async (dispatch) => {
    const { data } = await booking.get(
      `/Available?address_like=${address}&rooms_gte=${rooms}`
    );

    const result = data.filter((filter) => {
      if (
        moment(from).isBetween(filter.from, filter.to) &&
        moment(to).isBetween(filter.from, filter.to)
      ) {
        return true;
      } else if (
        moment(from).isSame(filter.from) &&
        moment(to).isBetween(filter.from, filter.to)
      ) {
        return true;
      } else if (
        moment(from).isBetween(filter.from, filter.to) &&
        moment(to).isSame(filter.to)
      ) {
        return true;
      } else if (
        moment(from).isSame(filter.from) &&
        moment(to).isSame(filter.to)
      ) {
        return true;
      } else return false;
    });

    dispatch({
      type: "ADDRESS",
      payload: result,
    });

    history.push("/search");
  };
};

export const checkout = (Values) => {
  return async () => {
    const result = await booking.get(`/Available/${Values.bookingId}`);
    if (result.data.rooms - Values.rooms >= 0) {
      const { data } = await booking.post("/Booking", { ...Values });
      await booking.patch(`/Available/${Values.bookingId}`, {
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

export const deleteBooking = (id) => {
  return async (dispatch, getState) => {
    await booking.delete(`/Booking/${id}`);

    dispatch({
      type: "DELETE_BOOKING",
      payload: id,
    });

    history.push(`/profile/${getState().auth.userId}`);
  };
};
