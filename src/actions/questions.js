import { saveQuestionAnswer, saveQuestion } from '../api/api'
import { saveAnswerToUser, saveQuestionToUser} from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER_TO_QUESTION = 'SAVE_ANSWER_TO_QUESTION'
export const SAVE_QUESTION_TO_QUESTION = "SAVE_QUESTION_TO_QUESTION"

export function receiveQuestions (questions) {  
    return{
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function saveAnswerToQuestion ({qid, authedUser, answer}) { 
    console.log(authedUser)
    return{
        type: SAVE_ANSWER_TO_QUESTION,
        qid,
        authedUser,
        answer
    }
}

export function saveQuestionToQuestion (question) {
    return{
        type: SAVE_QUESTION_TO_QUESTION,
        question
    }
}

export function handleSaveQuestion(question) {
  console.log(question);
  return (dispatch) => {
      return saveQuestion(question)
          .then((formatted_question) => {
              dispatch(saveQuestionToQuestion(formatted_question))
              dispatch(saveQuestionToUser(formatted_question))
          })
          .catch((e) => {
              console.warn('Error in handleQuestionAnswer: ', e);
              alert('There was an error saving Question. Try again.');
          });
  }
}

// asyncronouse action creator responsible for invoking saveQuestionAnswer, dispatching (thunk action creator)
export function handleQuestionAnswer(info) {
    console.log(info)
    return (dispatch) => {
        return saveQuestionAnswer(info)
            .then(() => {
                dispatch(saveAnswerToQuestion(info))
                dispatch(saveAnswerToUser(info))
            })
            .catch((e) => {
                console.warn('Error in handleQuestionAnswer: ', e);
                alert('There was an error saving Question. Try again.');
            });
        }
}