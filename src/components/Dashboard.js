import { connect } from "react-redux";
import PollCard from "./PollCard";
import "./Dashboard.scss";

const Dashboard = (props) => {
  return (
    <div className="dashboard">
      <h1>Unanswered Polls</h1>
      <ul style={{ listStyle: "none" }}>
        {props.uQuestions.map((id) => (
          <li key={id}>
            <PollCard id={id} />
          </li>
        ))}
      </ul>
      <h1>Answered Polls</h1>
      <ul style={{ listStyle: "none" }}>
        {props.aQuestions.map((id) => (
          <li key={id}>
            <PollCard id={id} />
          </li>
        ))}
      </ul>
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
