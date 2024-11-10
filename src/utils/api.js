import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA";

export function getUsers() {
  return _getUsers();
}

export function getQuestions() {
  return _getQuestions();
}

export function saveQuestion(question) {
  return _saveQuestion(question);
}

export function saveQuestionAnswer({ authedUser, qid, answer }) {
  return _saveQuestionAnswer({ authedUser, qid, answer });
}

function generateToken() {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export async function login(credentials) {
  const users = await _getUsers();

  if (
    users[credentials.userName] &&
    users[credentials.userName].password === credentials.password
  ) {
    return generateToken();
  }

  throw Error("invalid user/password");
}
