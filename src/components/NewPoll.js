import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";
import "./NewPoll.css";

const NewPoll = ({ dispatch, authedUser }) => {
  const [headline, setHeadline] = useState("");
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleAddQuestion(headline, firstOption, secondOption));

    document.getElementById("new-poll-form").reset();
    setHeadline("");
    setFirstOption("");
    setSecondOption("");
    navigate("/");
  };

  return (
    <section className="new-poll">
      <h1 className="page-title">Would you rather</h1>
      <p className="page-subtitle">Create your own poll</p>
      <form
        id="new-poll-form"
        className="new-poll-form"
        onSubmit={handleSubmit}
      >
        <p>Poll headline</p>
        <input
          type="text"
          id="poll-headline"
          className="input"
          placeholder="Enter text"
          onChange={(e) => setHeadline(e.target.value)}
        />

        <p>First option</p>
        <input
          type="text"
          id="poll-first-option"
          className="input"
          placeholder="Enter text"
          onChange={(e) => setFirstOption(e.target.value)}
        />

        <p>Second option</p>
        <input
          type="text"
          id="poll-second-option"
          className="input"
          placeholder="Enter text"
          onChange={(e) => setSecondOption(e.target.value)}
        />

        <div>
          <button
            className="button"
            type="submit"
            disabled={
              headline === "" || firstOption === "" || secondOption === ""
            }
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(NewPoll);
