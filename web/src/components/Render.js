import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

class Render extends React.Component {
  renderContent() {
    if (_.isEmpty(this.props.items)) {
      return (
        <div style={{ color: "white", fontSize: "22px" }}>
          No Room Available!
        </div>
      );
    } else
      return this.props.items.map((item) => {
        return (
          <div
            style={{
              height: "300px",
              display: "flex",
              justifyContent: "space-between",
            }}
            className="item"
            key={item._id}
          >
            <img
              alt="rooms"
              style={{ width: "430px", height: "auto" }}
              src={item.url}
            />
            <div
              style={{
                margin: "auto",
                lineHeight: "40px",
              }}
              className="content"
            >
              <div
                style={{ fontSize: "16px", fontFamily: "'Rubik', sans-serif" }}
                className="header"
              >
                {item.name}
              </div>
              <div
                className="description"
                style={{
                  width: "350px",
                  fontFamily: "'Jura', sans-serif",
                  fontWeight: "600",
                }}
              >
                {item.address}
              </div>
              <i className="large middle rupee sign icon" />
              <div style={{ display: "contents" }} className="description">
                {item.price}
              </div>
            </div>
            {this.renderBook(item)}
          </div>
        );
      });
  }

  renderBook(item) {
    if (this.props.isSignedIn && this.props.query.query.rooms !== 0) {
      return (
        <div style={{ margin: "auto" }} className="right floated content">
          <Link to={`/booking/${item._id}`} className="ui button primary">
            BOOK
          </Link>
        </div>
      );
    }
  }

  render() {
    if (window.location.pathname === "/search") {
      return (
        <div className="back">
          <div>
            <Link
              style={{
                position: "fixed",
                top: "20px",
                left: "20px",
                color: "white",
                fontSize: "16px",
              }}
              to="/"
            >
              <i
                style={{ color: "white" }}
                className="angle double left icon big"
              ></i>
              Home
            </Link>
          </div>

          <div style={{ marginTop: "75px" }} className="ui celled list">
            {this.renderContent()}
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ marginTop: "95px" }} className="ui celled list">
          {this.renderContent()}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    query: state.query,
  };
};

export default connect(mapStateToProps)(Render);
