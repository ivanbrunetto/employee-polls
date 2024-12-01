import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { addUserQuestion, addUserAnswer } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";

export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question,
  };
};

export const handleAddQuestion = (
  authedUser,
  headlineText,
  optionOneText,
  optionTwoText
) => {
  return (dispatch) => {
    return saveQuestion({
      headlineText,
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((question) => {
      dispatch(addQuestion(question));
      dispatch(addUserQuestion(authedUser, question.id));
    });
  };
};

const addQuestionAnswer = (authedUser, qid, answer) => {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
};

export const handleAddQuestionAnswer = (authedUser, qid, answer) => {
  return (dispatch) => {
    return saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
      dispatch(addQuestionAnswer(authedUser, qid, answer));
      dispatch(addUserAnswer(authedUser, qid, answer));
    });
  };
};
