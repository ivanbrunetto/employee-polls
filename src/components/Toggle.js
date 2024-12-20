import { useState } from "react";
import "./Toggle.css";

const Toggle = (props) => {
  const [toggled, setToggled] = useState(false);
  const { labels, toggleCallback } = props;
  const handleSetToggled = () => {
    setToggled(!toggled);
    toggleCallback(!toggled);
  };

  return (
    <div className="toggle-container">
      <p>{toggled ? labels[1] : labels[0]}</p>
      <button
        className={`toggle-btn ${toggled ? "toggled" : ""}`}
        onClick={handleSetToggled}
      >
        <div className="thumb"></div>
      </button>
    </div>
  );
};

export default Toggle;
