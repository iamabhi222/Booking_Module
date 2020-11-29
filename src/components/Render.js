import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Render extends React.Component {
  renderContent() {
    return this.props.items.map((item) => {
      return (
        <div className="item" key={item.id}>
          {this.renderBook(item)}
          <i className="large middle aligned icon image" />
          <div className="content">
            <div className="header">{item.name}</div>
            <div className="description">{item.address}</div>
            <i className="large middle rupee sign icon" />
            <div style={{ display: "contents" }} className="description">
              {item.price}
            </div>
          </div>
        </div>
      );
    });
  }

  renderBook(item) {
    if (this.props.isSignedIn) {
      return (
        <div className="right floated content">
          <Link to={`/booking/${item.id}`} className="ui button primary">
            BOOK
          </Link>
        </div>
      );
    }
  }

  render() {
    return <div className="ui celled list">{this.renderContent()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps)(Render);
