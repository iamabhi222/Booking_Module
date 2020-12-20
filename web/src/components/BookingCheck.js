import React, { useEffect } from "react";
import { queryRooms, checkout, fetchRooms } from "../Action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import history from "../helper/history";

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
    props.fetchRooms();
  }, [id]);

  const classes = useStyles();

  if (!props.room) {
    return <div>Loading...</div>;
  }

  const onClick = () => {
    if (props.auth.isSignedIn && props.query.query.rooms !== 0) {
      props.checkout({
        userId: props.auth.userId,
        rooms: props.query.query.rooms,
        from: props.query.query.from,
        to: props.query.query.to,
        bookingId: id,
      });
    } else {
      history.push("/error");
    }
  };
  return (
    <div>
      <Link
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          color: "black",
          fontSize: "16px",
          fontFamily: "'Josefin Sans', sans-serif",
          fontWeight: "600",
        }}
        to="/"
      >
        <i
          style={{ color: "black" }}
          className="angle double left icon big"
        ></i>
        Home
      </Link>
      <div
        style={{
          marginTop: "50px",
          height: "300px",
          display: "flex",
          justifyContent: "space-between",
        }}
        className="item"
      >
        <img
          alt="rooms"
          style={{ width: "430px", height: "auto" }}
          src={props.room.url}
        />
        <div style={{ margin: "auto", lineHeight: "40px" }} className="content">
          <div
            style={{ fontSize: "20px", fontFamily: "'Rubik', sans-serif" }}
            className="header"
          >
            {props.room.name}
          </div>
          <div
            className="description"
            style={{ fontFamily: "'Jura', sans-serif" }}
          >
            {props.room.address}
          </div>
          <i className="large middle rupee sign icon" />
          <div style={{ display: "contents" }} className="description">
            {props.room.price}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "40px",
        }}
      >
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

        <form className={classes.container} noValidate>
          <TextField
            disabled={true}
            label="to"
            name="to"
            type="date"
            defaultValue={props.query.query.to}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>

        <FormControl style={{ margin: "0" }} className={classes.formControl}>
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

        <div style={{ textAlign: "right" }}>
          <button className="ui button primary" onClick={onClick}>
            Checkout
          </button>
        </div>
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

export default connect(mapStateToProps, { fetchRooms, queryRooms, checkout })(
  BookingCheck
);
