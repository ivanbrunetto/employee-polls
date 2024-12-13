import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
  _login,
  _getAuthedUser,
} from "./_DATA";

export function getUsers() {
  return _getUsers();
}

export function getQuestions() {
  return _getQuestions();
}

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export function saveQuestion(question) {
  return _saveQuestion(question);
}

export function saveQuestionAnswer({ authedUser, qid, answer }) {
  return _saveQuestionAnswer({ authedUser, qid, answer });
}

export function login({ username, password }) {
  return _login({ username, password });
}

export function getAuthedUser(token) {
  return _getAuthedUser(token);
}
