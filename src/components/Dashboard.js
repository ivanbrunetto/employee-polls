import { connect } from "react-redux";

const Dashboard = (props) => {
  return (
    <>
      <h3>Unanswered Polls</h3>
      <ul>
        {props.uQuestions.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
      <h3>Answered Polls</h3>
      <ul>
        {props.aQuestions.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = ({ questions, users, authedUser }) => ({
  aQuestions: users[authedUser] ? Object.keys(users[authedUser].answers) : [],
  uQuestions: Object.keys(questions).filter(
    (id) => !Object.keys(users[authedUser]?.answers).includes(id)
  ),
});

export default connect(mapStateToProps)(Dashboard);
