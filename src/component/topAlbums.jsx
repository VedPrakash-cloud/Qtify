import SongCard from "./songCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import MusicPlayer from "./musicPlayer";


export default function Albums() {
  const [songData, setSongData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState("");
  const [play, setPlay] = useState(false)

  const handleClick =(e)=>{
    setIsClicked(e.id)
    setPlay(true)
  }

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
                value={isClicked}
                onClick={() => setIsClicked(item.id)}
              >
                <SongCard key={item.id} list={item} />
              </div>
            ))}
          </div>
        ) : (
          songData.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                value={isClicked}
                onClick={handleClick}
              >
                <SongCard list={item} />
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
        <div className="relative top-[1370px] md:top-[1330px] w-full px-2">
          {play && <MusicPlayer />}
        </div>
    </div>
  );
}
