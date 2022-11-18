import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Card from "react-bootstrap/Card";
import Question from "./Question";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {handleInitialData} from "../actions/shared";

class QuestionList extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData());

    }

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.questionIds);
        console.log(this.questionIds);
        console.log('this.type', this.props.type)

        return (
            <div label={this.props.type}>
                <ul className="questions-List">
                    {this.props.questionIds.map((id) => (
                        <li key={id}>
                            <Card>
                                <Card.Body>
                                    <Question id={id}/>
                                    <Link to={`/questions/${id}`}>
                                        <Button variant="warning">Details</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

QuestionList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
};


const mapStateToProps = ({questions, authedUser, id}, ownProps) => {

    const questionsArray = Object.keys(questions).map(question => questions[question]);

    const filteredQuestions = questionsArray
        .filter(question => {
            const hasLoggedInUserAnswered = question.optionOne.votes.includes(authedUser) ||
                question.optionTwo.votes.includes(authedUser);

            return ownProps.type === 'answered'
                ? hasLoggedInUserAnswered
                : !hasLoggedInUserAnswered;
        });

    console.log("filteredQuestions", filteredQuestions);

    // questions are sorted by time
    return {
        id,
        questionIds: filteredQuestions
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(({id}) => id),
    };
};


export default connect(mapStateToProps)(QuestionList);
