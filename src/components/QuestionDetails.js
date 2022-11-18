import React, {Component} from "react";
import {connect} from "react-redux";
import {formatDate, formatQuestion} from "../utils/helper";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import Redirector from "./Redirector";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {Container, Form, Progress, Radio, Segment} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import {handleQuestionAnswer} from "../actions/questions";
import {Redirect} from "react-router-dom";

class QuestionDetails extends Component {

    state = {};
    handleChange = (e, {value}) => this.setState({answer: value});


    onAnswerSubmit = (e) => {
        e.preventDefault();
        console.log('answer', this.state.answer)
        const {answer} = this.state;
        const {dispatch, question, authedUser} = this.props;

        dispatch(
            handleQuestionAnswer({
                qid: question.id,
                answer,
                authedUser,
            })
        );
    };


    render() {
        const {question} = this.props;
        if (!question) {
            console.log("Redirecting to 404");
            return <Redirect to='/404' />;
        }
        const {name, avatar, timestamp, optionOne, optionTwo} = question;

        return (

            <Card>
                <Redirector currentLocation="/questions/:question_id"/>
                <Card.Body>
                    <h4 className="center">Question Details</h4>
                    <div>

                        <Media>
                            <img width={80} height={80} className="mr-2" src={avatar} alt={`Avatar of ${name}`}/>
                            <Media.Body><h5>{name}</h5><p>{formatDate(timestamp)}</p></Media.Body>
                        </Media>

                        <hr/>

                        {this.props.isAnswered ? <Container>
                                <Segment floated='left' size='large'>
                                    <h4>{this.props.authedUserAnswer === "optionOne" ?
                                        <FontAwesomeIcon icon={faCheck} size="sm"/> : ""} Would you
                                        rather {this.props.optionOneText}</h4>
                                    <Progress value={this.props.optionOneVote} total={this.props.totalVotes} indicating
                                              label='test' size='large'></Progress>
                                    <h3>{this.props.optionOneVote} people voted for </h3>
                                    <h3>{this.props.optionOnePercentageVoted} </h3>

                                </Segment>
                                <Segment floated='right' size='large'>
                                    <h4>{this.props.authedUserAnswer === "optionOne" ?
                                        <FontAwesomeIcon icon={faCheck} size="sm"/> : ""} Would you
                                        rather {this.props.optionTwoText}</h4>
                                    <Progress value={this.props.optionTwoVote} total={this.props.totalVotes} inverted
                                              label='{this.props.optionTwoVote}' size='large'></Progress>
                                    <h3>{this.props.optionTwoVote} people voted for </h3>
                                    <h3>{this.props.optionTwoPercentageVoted} </h3>

                                </Segment>
                            </Container> :
                            <Form>
                                <Form.Field>
                                    Would you Rather ...?
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label={this.props.optionOneText}
                                        name='radioGroup'
                                        value='optionOne'
                                        checked={this.state.answer === 'optionOne'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label={this.props.optionTwoText}
                                        name='radioGroup'
                                        value='optionTwo'
                                        checked={this.state.answer === 'optionTwo'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>

                                <Button
                                    variant="warning"
                                    onClick={this.onAnswerSubmit}
                                    type="submit"
                                    disabled={
                                        this.state.answer === ""
                                    }
                                >
                                    Save
                                </Button>
                            </Form>}


                        <div>


                        </div>


                    </div>
                </Card.Body>

            </Card>
        );
    }
}


function mapStateToProps({authedUser, users, questions}) {
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    const question = questions[id];

    if (!question)
        return {question};

    const optionOne = question.optionOne
    const optionTwo = question.optionTwo
    const optOneVote = question.optionOne.votes.length
    const optTwoVote = question.optionTwo.votes.length

    const authedUserAnswer = users[authedUser].answers[id]
    const optOneText = question.optionOne.text
    const optTwoText = question.optionTwo.text

    const totalVotes = optOneVote + optTwoVote

    const optionOnePercentageVoted = (optOneVote / totalVotes) * 100
    const optionTwoPercentageVoted = (optTwoVote / totalVotes) * 100
    const isAnswered = [...question.optionOne.votes, ...question.optionTwo.votes].includes(authedUser);


    return {
        question: question
            // add a check to format the question only if the question is not undefined.
            ? formatQuestion(question, users[question.author], authedUser)
            : null,

        authedUser,
        optionOneVote: optOneVote,
        optionTwoVote: optTwoVote,
        optionOne,
        optionTwo,
        authedUserAnswer,
        optionOnePercentageVoted,
        optionTwoPercentageVoted,
        optionOneText: optOneText,
        optionTwoText: optTwoText,
        totalVotes,
        isAnswered

    };
}

export default connect(mapStateToProps)(QuestionDetails);