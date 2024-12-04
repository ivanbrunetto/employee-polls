import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import "./PollCard.css";

const PollCard = (props) => {
  const { id, author, avatarURL, timestamp, headline } = props;

  return (
    <NavLink to={`/questions/${id}`} className="poll-card">
      <img className="item-avatar" src={avatarURL} alt="avatar" />
      <div className="item-author-timestamp">
        <p className="author">{author}</p>
        <p className="timestamp">{formatDate(timestamp)}</p>
      </div>
      <div className="item-headline">
        <p className="headline">{headline}</p>
      </div>
    </NavLink>
  );
};

const mapStateToProps = ({ questions, users }, { id }) => ({
  author: questions[id] ? questions[id].author : null,
  avatarURL: questions[id] ? users[questions[id].author].avatarURL : null,
  timestamp: questions[id] ? questions[id].timestamp : null,
  headline: questions[id] ? questions[id].headline : null,
});

export default connect(mapStateToProps)(PollCard);
