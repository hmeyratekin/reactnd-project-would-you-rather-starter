import {RECEIVE_QUESTIONS, SAVE_ANSWER_TO_QUESTION, SAVE_QUESTION_TO_QUESTION,} from "../actions/questions";

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            console.log(state);
            return {
                ...state,
                ...action.questions,
            };

        case SAVE_QUESTION_TO_QUESTION:
            const {question} = action;
            return {
                ...state,
                [question.id]: question,
            };

        case SAVE_ANSWER_TO_QUESTION: {
            const {authedUser, qid, answer} = action;
            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authedUser]),
                    },
                },
            };
        }
        default:
            return state;
    }
}
