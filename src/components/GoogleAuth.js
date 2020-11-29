import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../Action";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "413941977033-me8t7bap6f6h5ib1vbe2ve4b8586qj27.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange); //	A function that takes a boolean value. listen() passes true to this function when the user signs in, and false when the user signs out.
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onClickSignIn = () => {
    this.auth.signIn();
  };

  onClickSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onClickSignOut} className="ui red google button">
          <i className="google icon"></i>Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onClickSignIn} className="ui blue google button">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
