import { useState, useEffect } from "react";
import SongCard from "./songCard";
import axios from "axios";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Musicplayer from './musicPlayer'

export default function LabTabs() {
  const [value, setValue] = useState("1");
  const [list, setList] = useState([]);
  const [albumList, setAlbumList] = useState([]);
  const[play, setPlay] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          "https://qtify-backend.labs.crio.do/genres"
        );
        const genreList = res.data.data;
        setList([{ key: "All", label: "All" }, ...genreList]);
      } catch (err) {
        console.error("Error in fetching Genre List", err);
      }
    };

    fetchdata();
  }, []);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await axios.get("https://qtify-backend.labs.crio.do/songs");
        setAlbumList(res.data);
      } catch (err) {
        console.error("Error in fetching data", err);
      }
    };
    fetchAlbum();
  }, []);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="text-[#FFFFFF] mt-3 px-6 font-semibold">
      <h1>Songs</h1>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} className="mb-3">
              {list.map((item, index) => (
                <Tab
                  label={item.label}
                  key={item.key}
                  value={String(index + 1)}
                  sx={{ color: "white", fontWeight: "bold" }}
                />
              ))}
            </TabList>
          </Box>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"4"}
            initialSlide={3}
            coverflowEffect={{
              rotate: 35,
              stretch: 0,
              depth: 50,
              modifier: 1,
            }}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            {list.map((genre, index)=>(
                <TabPanel key={genre.key || index} value={String(index+1)}>
                    {albumList.filter((song)=>
                    genre.key === 'ALL' ? true: song.genre?.key === genre.key).map((song)=>(
                        <SwiperSlide key={song.id}>
                            <div onClick={()=>setPlay(!play)}>
                              <SongCard list={song}/>
                            </div>
                        </SwiperSlide>
                    ))
                    }
                </TabPanel>
            ))}
          </Swiper>
        </TabContext>
        <div>
          {play && <Musicplayer />}
        </div>
      </Box>
    </div>
  );
}
