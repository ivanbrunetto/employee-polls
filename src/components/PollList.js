import PollCard from "./PollCard";
import { useState, useEffect } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./PollList.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PollList = (props) => {
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

  const { title, polls } = props;

  return (
    <section className="poll-list">
      <h2>{title}</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={slidesPerView}
        navigation
        pagination={{ clickable: true }}
      >
        {polls.map((id) => (
          <SwiperSlide key={id}>
            <PollCard id={id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PollList;
