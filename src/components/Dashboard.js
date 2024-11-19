import { connect } from "react-redux";
import PollCard from "./PollCard";
import "./Dashboard.css";

const Dashboard = (props) => {
  return (
    <div className="dashboard">
      <h2>Unanswered Polls</h2>
      <div className="poll-list-container">
        {props.uQuestions.map((id) => (
          <PollCard id={id} />
        ))}
      </div>
      <h2>Answered Polls</h2>
      <div className="poll-list-container">
        {props.aQuestions.map((id) => (
          <PollCard id={id} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }) => ({
  aQuestions: users[authedUser] ? Object.keys(users[authedUser].answers) : [],
  uQuestions: Object.keys(questions).filter(
    (id) => !Object.keys(users[authedUser]?.answers).includes(id)
  ),
});

export default connect(mapStateToProps)(Dashboard);
