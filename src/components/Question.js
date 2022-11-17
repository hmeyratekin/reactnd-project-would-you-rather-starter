import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate, formatQuestion } from "../utils/helper";
import Media from "react-bootstrap/Media";

class Question extends Component {
  render() {
    const { question } = this.props;
    const { name, avatar, timestamp, optionOne, optionTwo } = question;

    return (
      <div>
        <Media>
          <img width={80} height={80} className="mr-3" src={avatar} alt={`Avatar of ${name}`}/>
          <Media.Body> <h5>{name}</h5> <p>{formatDate(timestamp)}</p> </Media.Body>
        </Media>
        <hr/>
          <h4>{name} asks would you rather {optionOne.text} or {optionTwo.text}</h4>
        <div>

        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  return {
    question: formatQuestion(question, users[question.author], authedUser)

  };
}

export default connect(mapStateToProps)(Question);