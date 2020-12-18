import React from "react";
import { Link } from "react-router-dom";

class Error extends React.Component {
  render() {
    return (
      <div
        style={{
          fontSize: "20px",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1571003123771-bd6a099dd83a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1051&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          textAlign: "center",
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
          padding: "7px",
          marginTop: "10px",
        }}
      >
        <p style={{ color: "white", marginTop: "50px" }}>
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
