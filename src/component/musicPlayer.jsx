import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import Slider from "@mui/material/Slider";
import { useState } from "react";

export default function MusicPlayer({list}) {
  const [clicked, setClicked] = useState(false);
  const duration = 200;
  const [position, setPosition] = useState(32);


  return (
    <div className="bg-green-300/50 grid justify-items-center py-5 cursor-pointer">
      <div className="flex gap-5 justify-center">
        <div className="rounded-full p-2 hover:bg-gray-200/25">
        <FastRewindRounded />
        </div>
        <div onClick={() => setClicked(!clicked)} className="rounded-full p-2 hover:bg-gray-200/25">
          {clicked ? <PauseRounded /> : <PlayArrowRounded />}
        </div>
        <div className="rounded-full p-2 hover:bg-gray-200/25">
            <FastForwardRounded />
        </div>
      </div>
      <div className="w-2/5">
        <Slider
        aria-label="time-indicator"
        size="small"
        value={position}
        min={0}
        step={1}
        max={duration}
        onChange={(_, value) => setPosition(value)}
        sx={(t) => ({
            color: "rgba(0,0,0,0.87)",
            "& .MuiSlider-track": {
              border: "none",
            },
            "& .MuiSlider-thumb": {
              width: 24,
              height: 24,
              backgroundColor: "#fff",
              "&::before": {
                boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                boxShadow: "none",
              },
            },
            ...t.applyStyles("dark", {
              color: "#fff",
            }),
          })}
      />
      </div>
      <div className="flex w-1/5 items-center">
        <VolumeDownRounded />
        <Slider
          aria-label="Volume"
          defaultValue={70}
          sx={(t) => ({
            color: "rgba(0,0,0,0.87)",
            "& .MuiSlider-track": {
              border: "none",
            },
            "& .MuiSlider-thumb": {
              width: 24,
              height: 24,
              backgroundColor: "#fff",
              "&::before": {
                boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                boxShadow: "none",
              },
            },
            ...t.applyStyles("dark", {
              color: "#fff",
            }),
          })}
        />
        <VolumeUpRounded />
      </div>
    </div>
  );
}
