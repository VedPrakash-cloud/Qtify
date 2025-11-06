import SongCard from "./songCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function NewAlbum() {
  const [album, setAlbum] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://qtify-backend.labs.crio.do/albums/new"
        );
        setAlbum(res.data);
      } catch (err) {
        console.error("Error in fetching the album", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-6">
      <div className="flex justify-between text-white font-semibold my-6">
        <p>New Albums</p>
        <button type="button" onClick={()=>setIsOpen(!isOpen)} className={isOpen ? 'text-[#34C94B]':'text-[#FFFFFF]'}>{isOpen ? "Collapse" : "Show All"}</button>
      </div>
      <Swiper
      effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"4"}
        coverflowEffect={{
          rotate: 35,
          stretch: 0,
          depth: 50,
          modifier: 1,
        }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {isOpen ? 
        <div className="flex gap-5 flex-wrap justify-center">
            {album.map((item,index)=>(
                <SongCard list={item} key={index} />
            ))}
        </div> : 
        album.map((item,index)=>(
            <SwiperSlide key={index}>
                <SongCard list={item} />
            </SwiperSlide>
        ))
        }
      </Swiper>
    </div>
  );
}
