import {_checkLogin, _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer} from './_DATA.js'

export function getInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
}

export function saveQuestionAnswer(info) {
    return _saveQuestionAnswer(info)
}

export function saveQuestion(info) {
    return _saveQuestion(info)
}

export function checkLogin(authedUser) {
    return _checkLogin(authedUser)
}
  