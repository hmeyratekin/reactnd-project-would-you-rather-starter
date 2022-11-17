import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate, formatQuestion } from "../utils/helper";
import Media from "react-bootstrap/Media";

class Question extends Component {
  render() {
    // console.log(this.props)
    const { question, authedUser } = this.props;
    // console.log(authedUser);
    const { name, avatar, timestamp, optionOne, optionTwo } = question;

    return (
      <div>
        <Media>
          <img
            width={64}
            height={64}
            className="mr-3"
            src={avatar}
            alt={`Avatar of ${name}`}
          />
          <Media.Body>
            <h5>{name}</h5>
            <p>{formatDate(timestamp)}</p>
          </Media.Body>
        </Media>
        <hr/>
        <h4>Would you rather ...</h4>
        <div>

        </div>
        <div>

        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  // console.log(authedUser);
  return {
    authedUser,
    question: formatQuestion(question, users[question.author], authedUser),
  };
}

export default connect(mapStateToProps)(Question);