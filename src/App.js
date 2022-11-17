import React, { Component, Fragment } from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";

import NavComponent from "./components/Nav";
import Dashboard from "./components/Dashboard";
import QuestionNew from "./components/QuestionNew";
import Leaderboard from "./components/Leaderboard";
import Login from "./components/Login";
import Logout from "./components/Logout";
import QuestionRoute from "./components/QuestionRoute";
import PageNotFound from "./components/PageNotFound";

class App extends Component {


  render() {
    return (
        <Router>
          <Fragment>
            <div className="container">
              <div className="banner">
                <div className="banner-text">Would you rather..</div>
              </div>
              <NavComponent authedUser={this.props.authedUser} />
              {/* {this.props.loading === true ? null : this.props.authedUser === null*/}
              {this.props.authedUser === null ? (
                  <div>
                    <Route component={Login} />
                  </div>
              ) : (
                  <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/new-question" component={QuestionNew} />
                    <Route path="/leaderboard" component={Leaderboard} />
                    <Route path="/logout" component={Logout} />
                    <Route
                        path="/questions/:question_id"
                        component={QuestionRoute}
                        questions={this.props.questions}
                    />
                    <Route path="/404" component={PageNotFound} />
                  </Switch>
              )}

              <Navbar
                  className="navbar-fixed-bottom"
                  bg="dark"
                  expand="lg"
                  variant="dark"
              >

              </Navbar>
            </div>
          </Fragment>
        </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  console.log(authedUser);
  return {
    // loading: authedUser === null,
    authedUser,
  };
}

export default connect(mapStateToProps)(App);