import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import "./PollCard.css";

const PollCard = (props) => {
  return (
    <div className="grid-container">
      <div className="item-pcavatar">
        <img className="pcavatar" src={props.avatarURL} alt="avatar" />
      </div>
      <div className="item-author-timestamp">
        <p className="author">{props.author}</p>
        <p className="timestamp">{formatDate(props.timestamp)}</p>
      </div>
      <div className="item-headline">
        <p className="headline">{props.headline}</p>
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
