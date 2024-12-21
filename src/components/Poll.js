import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import "./Poll.css";
import Error from "./Error";
import { handleAddQuestionAnswer } from "../actions/questions";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let params = useParams();
    return <Component {...props} router={{ params }} />;
  };

  return ComponentWithRouterProp;
};

const Poll = (props) => {
  const {
    dispatch,
    loading,
    invalid,
    router,
    authedUser,
    author,
    avatarURL,
    headline,
    answer,
    optionOne,
    optionTwo,
  } = props;

  const disabled = answer ? "disabled" : "";
  const optionOneVoted = answer === "optionOne" ? "voted" : "";
  const optionTwoVoted = answer === "optionTwo" ? "voted" : "";

  if (!loading && invalid) {
    return <Error error={{ message: "Invalid question ID" }} />;
  }

  const handleOptionClick = (e) => {
    if (e.currentTarget.classList.contains("disabled")) {
      return;
    }

    dispatch(
      handleAddQuestionAnswer(authedUser, router.params.id, e.currentTarget.id)
    );
  };

  return loading ? null : (
    <section className="poll">
      <h1 className="page-title">Poll by {author}</h1>
      <img src={avatarURL} className="avatar" alt="avatar" />
      <p className="poll-headline">{headline}</p>
      <p className="font-large">Would you rather:</p>
      <div className="options-container">
        <div className="options">
          <div
            id="optionOne"
            className={`option-text-box ${disabled} ${optionOneVoted}`}
            onClick={handleOptionClick}
          >
            <p>{optionOne.text}</p>
          </div>
          <div
            id="optionTwo"
            className={`option-text-box ${disabled} ${optionTwoVoted}`}
            onClick={handleOptionClick}
          >
            <p>{optionTwo.text}</p>
          </div>
        </div>
        {answer && (
          <div className="options">
            <p className="option-stats">Users voted: {optionOne.votes}</p>
            <p className="option-stats">Users voted: {optionTwo.votes}</p>
          </div>
        )}
        {answer && (
          <div className="options">
            <p className="option-stats">{optionOne.percent}%</p>
            <p className="option-stats">{optionTwo.percent}%</p>
          </div>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (
  { authedUser, loadingBar, questions, users },
  props
) => {
  const id = props.router.params.id;
  const question = questions[id];

  let retObj = { loading: loadingBar.default !== 0, invalid: false };

  if (!question) {
    retObj.invalid = true;
  } else {
    retObj.authedUser = authedUser;
    retObj.author = users[question.author].name;
    retObj.avatarURL = users[question.author].avatarURL;
    retObj.headline = question.headline;
    retObj.optionOne = { text: question.optionOne.text };
    retObj.optionTwo = { text: question.optionTwo.text };

    if (users[authedUser].answers[id]) {
      retObj.answer = users[authedUser].answers[id];
      retObj.optionOne.votes = question.optionOne.votes.length;
      retObj.optionTwo.votes = question.optionTwo.votes.length;

      const totalVotes = retObj.optionOne.votes + retObj.optionTwo.votes;

      retObj.optionOne.percent = Math.round(
        (100 * retObj.optionOne.votes) / totalVotes
      );

      retObj.optionTwo.percent = Math.round(
        (100 * retObj.optionTwo.votes) / totalVotes
      );
    }
  }

  return retObj;
};

export default withRouter(connect(mapStateToProps)(Poll));
