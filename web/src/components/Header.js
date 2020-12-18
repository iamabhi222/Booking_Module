import React, { useState, useEffect } from "react";
import GoogleAuth from "./GoogleAuth";
import { Link } from "react-router-dom";
import Content from "./Content";
import { queryRooms, fetchRooms, search } from "../Action";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
var moment = require("moment-timezone");

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Header = (props) => {
  const date = moment.tz("Asia/Calcutta").format("YYYY-MM-DD");
  const dateTwo = moment().add(1, "day").endOf("day").format("YYYY-MM-DD");
  const [text, setText] = useState("");
  const [fromDate, setFromDate] = useState(date);
  const [toDate, setToDate] = useState(dateTwo);
  const [Guests, setGuests] = useState(1);

  useEffect(() => {
    props.fetchRooms();
    props.search({
      address: text,
      from: fromDate,
      to: toDate,
      rooms: Guests,
    });
  });

  const onClick = () => {
    //on button click queryRooms and search action creater are called
    props.queryRooms({
      address: text,
      from: fromDate,
      to: toDate,
      rooms: Guests,
    });
    props.search({
      //used to set the query params
      address: text,
      from: fromDate,
      to: toDate,
      rooms: Guests,
    });
  };

  const classes = useStyles();

  const user = () => {
    if (!props.auth.isSignedIn) {
      return (
        <div
          style={{
            color: "yellowgreen",
            fontSize: "16px",
            margin: "5px 0",
            fontWeight: "100",
          }}
        >
          Login
        </div>
      );
    } else {
      return (
        <Link
          to={`/profile/${props.auth.userId}`}
          style={{
            color: "yellowgreen",
            fontSize: "16px",
            margin: "5px 0px",
            fontWeight: "100",
          }}
        >
          {window.gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getBasicProfile()
            .getName()}
        </Link>
      );
    }
  };

  return (
    <div className="back">
      <div
        style={{
          display: "flex",
          position: "fixed",
          top: "30px",
          color: "yellowgreen",
          left: "10px",
        }}
      >
        <i className="user circle icon big"></i>
        <div>{user()}</div>
      </div>
      <div
        style={{
          width: "500px",
          marginTop: "10px",
          background: "antiquewhite",
        }}
        className="ui centered container grid"
      >
        <div
          style={{
            border: "1px solid black",
            borderRight: "none",
            padding: "0",
          }}
          className="four wide column"
        >
          {/* //address input */}
          <input
            style={{
              width: "280px",
              height: "68px",
              padding: "0 20px",
              fontSize: "18px",
              border: "none",
              outline: "none",
            }}
            placeholder="Address"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>
        <div
          style={{
            padding: "6px 0",
            border: "1px solid black",
            borderRight: "none",
          }}
          className="three wide column"
        >
          {/* //Booking from date */}
          <form className={classes.container} noValidate>
            <TextField
              onChange={(e) => setFromDate(e.target.value)}
              label="from"
              name="from"
              type="date"
              defaultValue={date}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: date,
                max: moment().add(10, "day").endOf("day").format("YYYY-MM-DD"),
              }}
            />
          </form>
        </div>
        <div
          style={{
            padding: "6px 0",
            border: "1px solid black",
            borderRight: "none",
            borderLeft: "none",
          }}
          className="three wide column"
        >
          {/* Booking to date */}
          <form className={classes.container} noValidate>
            <TextField
              onChange={(e) => setToDate(e.target.value)}
              label="to"
              name="to"
              type="date"
              defaultValue={dateTwo}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: toDate,
                max: moment().add(10, "day").endOf("day").format("YYYY-MM-DD"),
              }}
            />
          </form>
        </div>
        <div
          style={{
            padding: "0px 40px",
            border: "1px solid black",
            borderRight: "none",
          }}
          className="three wide column"
        >
          {/* //Number of rooms selected */}
          <FormControl
            style={{ margin: "6px" }}
            className={classes.formControl}
          >
            <InputLabel htmlFor="grouped-native-select">Rooms</InputLabel>
            <Select
              onChange={(e) => setGuests(e.target.value)}
              native
              defaultValue="1"
              id="grouped-native-select"
            >
              <optgroup label="Duplex (2x)">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </optgroup>
            </Select>
          </FormControl>
        </div>
        <div
          style={{ position: "fixed", right: "-135px" }}
          className="three wide column"
        >
          {/* //google sign in button */}
          <GoogleAuth />
        </div>
        <button
          style={{
            padding: "0px",
            height: "70px",
            margin: "0",
            width: "211px",
            borderRadius: "0",
          }}
          onClick={onClick}
          className="ui button primary"
        >
          Submit
        </button>
      </div>

      <div style={{ marginTop: "30px" }} className="ui container">
        {" "}
        {/* //All available hotels */}
        <Content />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { queryRooms, fetchRooms, search })(
  Header
);
