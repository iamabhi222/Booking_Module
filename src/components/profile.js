import React from "react";
import { UserBooking } from "../Action";
import { connect } from "react-redux";

class Profile extends React.Component {
  componentDidMount() {
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
      return (
        <div
          style={{ marginTop: "40px", display: "contents" }}
          key={check.id}
          className="item"
        >
          <p
            style={{ marginRight: "10px", display: "contents" }}
            className="content"
          >
            From----
          </p>
          <h5 style={{ display: "contents" }}>{check.from}</h5>
          <p
            style={{ marginRight: "10px", display: "contents" }}
            className="content"
          >
            To----
          </p>
          <h5 style={{ display: "contents" }}>{check.to}</h5>
          <p
            style={{ marginRight: "10px", display: "contents" }}
            className="description"
          >
            Rooms----
          </p>
          <h5 style={{ display: "contents" }}>{check.rooms}</h5>
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
        <img alt="profilePic" src={this.image} />
        <h3>{this.name}</h3>
        <div className="ui celled list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    checkout: Object.values(state.checkout),
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { UserBooking })(Profile);
