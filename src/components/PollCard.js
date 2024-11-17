import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import "./PollCard.scss";

const PollCard = (props) => {
  return (
    <div className="poll-card">
      <img src={props.avatarURL} alt="avatar" />
      <div className="info">
        <p>{props.author}</p>
        <p>{formatDate(props.timestamp)}</p>
        <p>{props.headline}</p>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, users }, { id }) => ({
  author: questions[id] ? questions[id].author : null,
  avatarURL: questions[id] ? users[questions[id].author].avatarURL : null,
  timestamp: questions[id] ? questions[id].timestamp : null,
  headline: questions[id] ? questions[id].headline : null,
});

export default connect(mapStateToProps)(PollCard);
