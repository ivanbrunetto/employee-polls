import { connect } from "react-redux";
import "./Leaderboard.css";
import trophy from "../images/icons8-trophy-80.png";

const LeaderBoard = (props) => {
  const { loading, users } = props;

  const rankedUsers = users.toSorted((a, b) => b.score - a.score);
  let pos = 1;
  return loading ? null : (
    <section className="leaderboard">
      <div className="title-container">
        <img src={trophy} alt="trophy"></img>
        <h1 className="page-title">Leaderboard</h1>
        <img src={trophy} alt="trophy"></img>
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col">Answered</th>
            <th scope="cold">Created</th>
          </tr>
        </thead>
        <tbody>
          {rankedUsers.map((user) => (
            <tr key={user.id}>
              <th scope="row">{pos++}</th>
              <td>
                <img className="avatar" src={user.avatarURL} alt="avatar"></img>
              </td>
              <td>{user.name}</td>
              <td>{user.answered}</td>
              <td>{user.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

const mapStateToProps = ({ loadingBar, users }) => ({
  loading: loadingBar.default !== 0,
  users: Object.values(users).map((user) => ({
    id: user.id,
    name: user.name,
    avatarURL: user.avatarURL,
    answered: Object.keys(user.answers).length,
    created: user.questions.length,
    score: Object.keys(user.answers).length + user.questions.length,
  })),
});

export default connect(mapStateToProps)(LeaderBoard);
