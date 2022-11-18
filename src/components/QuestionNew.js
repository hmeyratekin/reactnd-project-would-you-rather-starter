import React, {Component} from "react";
import {connect} from "react-redux";
import {handleSaveQuestion} from "../actions/questions";
import Button from "react-bootstrap/Button";
import Redirector from "./Redirector";
import {Redirect} from "react-router-dom";
import {Form, Segment} from "semantic-ui-react";

class QuestionNew extends Component {
    state = {
        //set state as empty string
        optionOneText: "",
        optionTwoText: "",
        toHome: false,
    };

    onOptionOneChange = (e) => {
        this.setState(() => ({optionOneText: e.target.value}));
    };
    onOptionTwoChange = (e) => {
        this.setState(() => ({optionTwoText: e.target.value}));
    };

    onNewQuestionSubmit = (e) => {
        e.preventDefault();
        // add Question to Store
        const {optionOneText, optionTwoText} = this.state;
        const {dispatch, authedUser} = this.props;


        //passing values to dispatch
        dispatch(
            handleSaveQuestion({optionOneText, optionTwoText, author: authedUser})
        );
        // reset to empty string
        this.setState(() => ({
            optionOneText: "",
            optionTwoText: "",
            toHome: true,
        }));
    };

    render() {
        if (this.state.toHome) {
            return <Redirect to="/"/>;
        }
        return (
            <div>
                <Redirector currentLocation="/new-question"/>
                <Segment inverted>
                    <Form inverted>
                        <h4 className="center">Add new question!</h4>
                        <h4>Would you rather?</h4>

                        <Form.Group widths='equal'>

                            <Form.Input fluid label='Option One' placeholder='Option One'
                                        onChange={this.onOptionOneChange}/>
                            <Form.Input fluid label='Option Two' placeholder='Option Two'
                                        onChange={this.onOptionTwoChange}/>
                        </Form.Group>
                        <Button type='submit' onClick={this.onNewQuestionSubmit}
                                disabled={this.state.optionOneText === "" || this.state.optionTwoText === ""
                                }>Save</Button>
                    </Form>
                </Segment>
            </div>
        );
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser,
    };
}

export default connect(mapStateToProps)(QuestionNew);