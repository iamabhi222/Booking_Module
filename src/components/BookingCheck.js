import React, { useEffect, useState } from "react";
import { fetchRoom, queryRooms, checkout } from "../Action";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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

const BookingCheck = (props) => {
  const id = props.match.params.id;

  useEffect(() => {
    props.fetchRoom(id);
  }, [id]);

  const classes = useStyles();

  if (!props.room) {
    return <div>Loading...</div>;
  }

  const onClick = () => {
    if (props.auth.isSignedIn && props.query.query.rooms != 0) {
      props.checkout({
        userId: props.auth.userId,
        rooms: props.query.query.rooms,
        from: props.query.query.from,
        to: props.query.query.to,
        bookingId: id,
      });
    }
  };
  return (
    <div>
      <h1>{props.room.name}</h1>
      <h4>{props.room.address}</h4>
      <i className="large middle rupee sign icon" />
      <h5 style={{ display: "contents" }}>{props.room.price}</h5>
      <div className="">
        <form className={classes.container} noValidate>
          <TextField
            disabled={true}
            label="from"
            name="from"
            type="date"
            defaultValue={props.query.query.from}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
      </div>
      <div className="">
        <form className={classes.container} noValidate>
          <TextField
            disabled={true}
            label="from"
            name="from"
            type="date"
            defaultValue={props.query.query.to}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
      </div>
      <div className="">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="grouped-native-select">
            {props.query.query.rooms}
          </InputLabel>
          <Select
            native
            defaultValue={props.query.query.rooms}
            id="grouped-native-select"
            disabled={true}
          ></Select>
        </FormControl>
      </div>
      <div style={{ textAlign: "right" }}>
        <button className="ui button primary" onClick={onClick}>
          Checkout
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    room: state.rooms[ownProps.match.params.id],
    query: state.query,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { fetchRoom, queryRooms, checkout })(
  BookingCheck
);
