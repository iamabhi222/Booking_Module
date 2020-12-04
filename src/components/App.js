import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../helper/history";
import Content from "./Content";
import Profile from "./profile";
import Error from "./error";

import BookingCheck from "./BookingCheck";
import Header from "./Header";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/" exact component={Header} />
            <Route path="/search" back="yes" exact component={Content} />
            <Route path="/booking/:id" exact component={BookingCheck} />
            <Route path="/profile/:userId" exact component={Profile} />
            <Route path="/error" exact component={Error} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
