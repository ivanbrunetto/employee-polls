import { connect } from "react-redux";
import PollCard from "./PollCard";
import "./Dashboard.css";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

register();

const Dashboard = (props) => {
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setSlidesPerView(3);
      } else if (window.innerWidth < 700) {
        setSlidesPerView(1);
      } else {
        setSlidesPerView(2);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="dashboard">
      <h2>Unanswered Polls</h2>
      <div className="poll-list-container">
        <Swiper
          slidesPerView={slidesPerView}
          navigation
          pagination={{ clickable: true }}
        >
          {props.uQuestions.map((id) => (
            <SwiperSlide key={id}>
              <PollCard id={id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <h2>Answered Polls</h2>
      <div className="poll-list-container">
        <Swiper
          slidesPerView={slidesPerView}
          pagination={{ clickable: true }}
          navigation
        >
          {props.aQuestions.map((id) => (
            <SwiperSlide key={id}>
              <PollCard id={id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const mapStateToProps = ({ questions, users, authedUser }) => ({
  aQuestions: users[authedUser] ? Object.keys(users[authedUser].answers) : [],
  uQuestions: Object.keys(questions).filter(
    (id) => !Object.keys(users[authedUser]?.answers).includes(id)
  ),
});

export default connect(mapStateToProps)(Dashboard);
