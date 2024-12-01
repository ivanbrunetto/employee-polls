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

const mapStateToProps = ({ loadingBar, questions, users, authedUser }) => ({
  loading: loadingBar.default !== 0,
  answeredQuestions: users[authedUser]
    ? Object.keys(users[authedUser].answers)
    : [],
  unansweredQuestions: Object.keys(questions).filter(
    (id) => !Object.keys(users[authedUser]?.answers).includes(id)
  ),
});

export default connect(mapStateToProps)(Dashboard);
