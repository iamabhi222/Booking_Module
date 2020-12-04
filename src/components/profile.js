import React from "react";
import { UserBooking, deleteBooking, fetchRooms } from "../Action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Profile extends React.Component {
  componentDidMount() {
    this.props.fetchRooms();
    this.props.UserBooking(this.props.match.params.userId);
    if (this.props.isSignedIn) {
      this.name = window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getBasicProfile()
        .getName();
      this.image = window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getBasicProfile()
        .getImageUrl();
    }
  }

  renderList() {
    return this.props.checkout.map((check) => {
      if (!this.props.rooms[check.bookingId]) {
        return <div>Loading...</div>;
      }
      return (
        <div key={check.id}>
          <div style={{ padding: "20px", fontSize: "20px" }}>
            {this.props.rooms[check.bookingId].name}
          </div>
          <div
            style={{
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid black",
            }}
            className="item"
          >
            <div>
              <p style={{ marginRight: "10px" }} className="content">
                From
              </p>
              <h5 style={{ margin: "0" }}>{check.from}</h5>
            </div>
            <div>
              <p style={{ marginRight: "10px" }} className="content">
                To
              </p>
              <h5 style={{ margin: "0" }}>{check.to}</h5>
            </div>
            <div>
              <p style={{ marginRight: "10px" }} className="description">
                Rooms
              </p>
              <h5 style={{ margin: "0" }}>{check.rooms}</h5>
            </div>
            <div style={{ margin: "0" }}>
              <button
                style={{ padding: "0 30px", height: "45px" }}
                onClick={() => this.props.deleteBooking(check.id)}
                className="ui button negative"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    if (!this.props.isSignedIn) {
      return <div>Please Login</div>;
    }
    return (
      <div>
        <div>
          <Link
            style={{
              position: "fixed",
              top: "20px",
              left: "20px",
              color: "black",
              fontSize: "16px",
            }}
            to="/"
          >
            <i style={{ color: "black" }} className="home icon big"></i>Home
          </Link>
        </div>
        <div style={{ display: "flex", marginBottom: "70px" }}>
          <img
            style={{ margin: "10px 0 0" }}
            alt="profilePic"
            src={this.image}
          />
          <h3 style={{ padding: "25px 50px" }}>{this.name}</h3>
        </div>

        <div className="ui celled list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    checkout: Object.values(state.checkout),
    isSignedIn: state.auth.isSignedIn,
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, {
  UserBooking,
  deleteBooking,
  fetchRooms,
})(Profile);
