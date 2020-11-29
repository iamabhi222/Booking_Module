import React from "react";
import { connect } from "react-redux";
import Render from "./Render";

class Content extends React.Component {
  render() {
    return (
      <div>
        <Render items={this.props.rooms} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rooms: Object.values(state.rooms),
  };
};

export default connect(mapStateToProps)(Content);
