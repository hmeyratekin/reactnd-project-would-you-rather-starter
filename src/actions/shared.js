import {getInitialData} from "../api/api";
import {receiveUsers} from '../actions/users'
import {receiveQuestions} from '../actions/questions'

getInitialData()

export function handleInitialData() {

    return (dispatch) => {
        return getInitialData()
            .then(({questions, users}) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
            })
    }
}