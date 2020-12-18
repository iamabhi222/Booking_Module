import React from "react";
import { deleteBooking } from "../Action";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "./Modal";
import history from "../helper/history";

class Delete extends React.Component {
  renderActions() {
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteBooking(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to={`/profile/${this.props.auth.userId}`} className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.checkout) {
      return "Are you sure you want to delete this Booking?";
    }

    return `Are you sure you want to delete the Booking with name:${
      this.props.rooms[this.props.checkout.bookingId].name
    }`;
  }

  render() {
    return (
      <Modal
        title="Delete Booking"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push(`/profile/${this.props.auth.userId}`)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    checkout: state.checkout[ownProps.match.params.id],
    rooms: state.rooms,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { deleteBooking })(Delete);
