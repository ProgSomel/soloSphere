// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import bgImg1 from "../assets/images/carousel1.jpg";
import bgImg2 from "../assets/images/carousel2.jpg";
import bgImg3 from "../assets/images/carousel3.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "./Slide";

export default function Carousel() {
  return (
    <div className="container px-4 py-10 mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide
            image={bgImg1}
            text="Get your Web Development Project Done in a Minutes"
          ></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={bgImg2} text="Get your Web Development Project Done in a Minutes"></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={bgImg3} text="Get your Web Development Project Done in a Minutes"></Slide>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
