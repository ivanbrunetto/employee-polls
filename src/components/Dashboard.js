import { connect } from "react-redux";
import PollList from "./PollList";
import "./Dashboard.css";

const Dashboard = (props) => {
  const { loading, answeredQuestions, unansweredQuestions } = props;
  return loading ? (
    ""
  ) : (
    <section className="dashboard">
      <h1 className="page-title">Dashboard</h1>
      <PollList title={"Unanswered Polls"} polls={unansweredQuestions} />
      <PollList title={"Answered Polls"} polls={answeredQuestions} />
    </section>
  );
};

const mapStateToProps = ({ loadingBar, questions, users, authedUser }) => {
  const orderedQuestions = Object.values(questions)
    .toSorted((a, b) => b.timestamp - a.timestamp)
    .map((question) => question.id);

  return {
    loading: loadingBar.default !== 0,
    answeredQuestions: users[authedUser]
      ? orderedQuestions.filter((qid) =>
          Object.keys(users[authedUser]?.answers).includes(qid)
        )
      : [],
    unansweredQuestions: orderedQuestions.filter(
      (qid) => !Object.keys(users[authedUser]?.answers).includes(qid)
    ),
  };
};

export default connect(mapStateToProps)(Dashboard);
