import {RECEIVE_USERS, SAVE_ANSWER_TO_USER, SAVE_QUESTION_TO_USER} from '../actions/users'
export default function users(state = {}, action) {
    switch (action.type) {

        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users,
            };

        case SAVE_ANSWER_TO_USER:
            const {answer, qid, authedUser} = action.question;
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }
            };

        case SAVE_QUESTION_TO_USER:
            return {
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: state[action.question.author].questions.concat(action.question.id)
                }
            }

        default:
            return state;
    }
}