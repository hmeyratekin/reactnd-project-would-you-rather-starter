import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {Link} from 'react-router-dom'
import Redirector from "./Redirector";

import {handleInitialData} from "../actions/shared";
import QuestionList from "./QuestionList";

class Dashboard extends Component {
state = {
  defaultTab: "Unanswered"
}


handleTab = (e) => {
  this.setState(() => ({
    defaultTab: e
  }))
}
  render() {

    return (
      <div className="dashboard">
        <Redirector currentLocation="/"/>
        <Tabs defaultActiveKey="profile" id="HomePage"   activeKey={this.state.defaultTab} onSelect={this.handleTab}>

          <Tab  htmlFor="Unanswered" eventKey="Unanswered" title="Unanswered questions">
            <QuestionList type="unanswered"></QuestionList>
          </Tab>

          <Tab htmlFor="Answered" eventKey="Answered" title="Answered questions">
           <QuestionList type="answered"></QuestionList>
          </Tab>

        </Tabs>
      </div>
    );
  }
}


/* take a state of our store { questions } */

export default Dashboard;