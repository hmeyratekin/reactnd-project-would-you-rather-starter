import React, { Component, Fragment} from "react";
import { connect } from "react-redux";
import { formatDate, formatQuestion } from "../utils/helper";

//import { handleQuestionAnswer } from "../actions/questions";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Redirector from "./Redirector";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {Container, Progress, Segment} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

class QuestionDetails extends Component {

    render() {
        const { question } = this.props;
        const { name, avatar, timestamp, optionOne, optionTwo} = question;

        return (  
            <Card>
                <Redirector currentLocation="/questions/:question_id"/>
                <Card.Body>
                <h4 className="center">Question Details</h4>
                <div>

                    <Media>
                        <img width={80} height={80} className="mr-2" src={avatar} alt={`Avatar of ${name}`}/>
                        <Media.Body ><h5>{name}</h5><p>{formatDate(timestamp)}</p></Media.Body>
                    </Media>

                    <hr/>

                    <Container>
                        <Segment floated='left' size='large'>This segment will appear to the left
                            <h4>{this.props.authedUserAnswer === "optionOne" ? <FontAwesomeIcon icon={faCheck} size="sm" />: ""} Would you rather {this.props.optionOneText}</h4>
                            <Progress value={this.props.optionOneVote}  total={this.props.totalVotes} indicating label='test' size='large'></Progress>

                            <h3>{this.props.optionOneVote} people voted for </h3>
                            <h3>{this.props.optionOnePercentageVoted} </h3>

                        </Segment>
                        <Segment floated='right' size='large'>This segment will appear to the right
                            <h4>{this.props.authedUserAnswer === "optionOne" ? <FontAwesomeIcon icon={faCheck} size="sm" />: ""} Would you rather {this.props.optionTwoText}</h4>
                            <Progress value={this.props.optionTwoVote}  total={this.props.totalVotes} inverted label='{this.props.optionTwoVote}' size='large'></Progress>
                            <h3>{this.props.optionTwoVote} people voted for </h3>
                            <h3>{this.props.optionTwoPercentageVoted} </h3>

                        </Segment>
                    </Container>


        
                </div>
              </Card.Body>
          
            </Card>
        );
    }
}
    
    
    function mapStateToProps({ authedUser, users, questions }) {
        let url = window.location.pathname;
        let id = url.substring(url.lastIndexOf('/') + 1);

        const question = questions[id];

        const optionOne = question.optionOne
        const optionTwo = question.optionTwo
        const optOneVote = question.optionOne.votes.length
        const optTwoVote = question.optionTwo.votes.length

        const authedUserAnswer = users[authedUser].answers[id]
        const optOneText = question.optionOne.text
        const optTwoText = question.optionTwo.text

        const totalVotes = optOneVote + optTwoVote

        const optionOnePercentageVoted = (optOneVote/totalVotes)*100
        const optionTwoPercentageVoted = (optTwoVote/totalVotes)*100


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
            totalVotes
            
      };
    }
    
    export default connect(mapStateToProps)(QuestionDetails);