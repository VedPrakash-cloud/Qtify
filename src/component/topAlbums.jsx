import SongCard from "./songCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";


export default function Albums() {
  const [songData, setSongData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://qtify-backend.labs.crio.do/albums/top"
        );
        setSongData(res.data);
      } catch (err) {
        console.error("Error fetching the song list", err);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="px-6">
      <div className="flex my-6 justify-between">
        <p className="text-white font-semibold">Top Album</p>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={
            isOpen
              ? "text-[#34C94B] font-semibold"
              : "text-[#FFFFFF] font-semibold"
          }
        >
          {isOpen ? "Collapse" : "Show all"}
        </button>
      </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        initialSlide={3}
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
        {isOpen ? (
          <div className="flex justify-center gap-5 flex-wrap">
            {songData.map((item) => (
              <div
                key={item.id}
                onClick = {()=>{
                  navigate(`/album/${item.id}`, {state:{album:item, type:"top"}})
                }}
              >
                <SongCard key={item.id} list={item} />
              </div>
            ))}
          </div>
        ) : (
          songData.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                key={item.id}
                onClick={()=>{
                  navigate(`/album/${item.id}`, {state:{album:item,type:"top"}})
                }}
              >
                <SongCard list={item} />
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}
