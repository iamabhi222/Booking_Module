import React from "react";
import { Link } from "react-router-dom";

class Error extends React.Component {
  render() {
    return (
      <div
        className="back"
        style={{
          fontSize: "20px",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        <p style={{ color: "white", marginTop: "35px" }}>
          Opps!!! &nbsp; Not enough rooms left on this property
        </p>

        <Link
          to="/"
          style={{ marginLeft: "30px", padding: "9px 25px" }}
          className="ui button"
        >
          Back
        </Link>
      </div>
    );
  }
}
export default Error;
