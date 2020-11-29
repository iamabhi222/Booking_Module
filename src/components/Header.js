import React, { useState, useEffect } from "react";
import GoogleAuth from "./GoogleAuth";
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
  const [text, setText] = useState("");
  const [fromDate, setFromDate] = useState(date);
  const [toDate, setToDate] = useState(date);
  const [Guests, setGuests] = useState(0);

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
    props.queryRooms({
      address: text,
      from: fromDate,
      to: toDate,
      rooms: Guests,
    });
    props.search({
      address: text,
      from: fromDate,
      to: toDate,
      rooms: Guests,
    });
  };

  const classes = useStyles();

  return (
    <div>
      <div style={{ marginTop: "10px" }} className="ui centered container grid">
        <div className="four wide column">
          <div className="ui action input">
            <input onChange={(e) => setText(e.target.value)} value={text} />
          </div>
        </div>
        <div className="three wide column">
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
        <div className="three wide column">
          <form className={classes.container} noValidate>
            <TextField
              onChange={(e) => setToDate(e.target.value)}
              label="to"
              name="to"
              type="date"
              defaultValue={date}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: fromDate,
                max: moment().add(10, "day").endOf("day").format("YYYY-MM-DD"),
              }}
            />
          </form>
        </div>
        <div className="three wide column">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-native-select">Rooms</InputLabel>
            <Select
              onChange={(e) => setGuests(e.target.value)}
              native
              defaultValue=""
              id="grouped-native-select"
            >
              <option aria-label="None" value="" />
              <optgroup label="Duplex (2x)">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </optgroup>
            </Select>
          </FormControl>
        </div>
        <div className="three wide column">
          <GoogleAuth />
        </div>
        <button onClick={onClick} className="ui button primary">
          Submit
        </button>
      </div>

      <div style={{ marginTop: "30px" }} className="ui container">
        <Content />
      </div>
    </div>
  );
};

export default connect(null, { queryRooms, fetchRooms, search })(Header);
