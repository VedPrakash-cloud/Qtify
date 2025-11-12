import { useLocation, Navigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Musicplayer from './musicPlayer';

export default function SongLists() {
  const location = useLocation();
  const album = location.state?.album;
  const [play, setPlay] = useState(false);
  const [page, setPage] = useState(1);
  const songPerPage = 13;

  const handleClick = ()=>{
    setPlay(true)
  }

  if (!album.songs) return <p>No Songs Found</p>;

  const songs = album.songs;
  const totalPages = Math.ceil(songs.length / songPerPage);

  const startIndex = (page - 1) * songPerPage;
  const endIndex = startIndex + songPerPage;
  const currentSongs = songs.slice(startIndex, endIndex);

  const handleEvent = (event, value) => {
    setPage(value);
  };

  const getPlaylistDuration = (album) => {
    if (!album.songs || !Array.isArray(album.songs)) return "No Songs found";

    const totalTime = album.songs.reduce((sum, s) => sum + s.durationInMs, 0);

    const totalSecond = Math.floor(totalTime / 1000);

    const hour = Math.floor(totalSecond / 3600);
    const min = Math.floor((totalSecond % 3600) / 60);
    const sec = totalSecond % 60;

    if (hour > 0) {
      return `${hour} hr ${min} min ${sec.toString().padStart(2, "0")} sec`;
    } else {
      return `${min}min ${sec.toString().padStart(2, "0")} sec`;
    }
  };

  if (!album) return <Navigate to="/" replace />;

  return (
    <div className="m-auto w-4/5">
      <div className="h-48 flex my-6 px-6 gap-5">
        <img
          src={album.image}
          alt="album-cover"
          className="h-48 w-48 object-cover rounded-lg shadow-lg shadow-gray-500/50"
        />
        <div className="text-white text-left">
          <h1 className="text-4xl mb-2">{album.slug}</h1>
          <p className="text-xs w-2/5 md:w-max mb-2">{album.description}</p>
          <p className="flex gap-1">
            {album.songs.length} Songs . {getPlaylistDuration(album)} .{" "}
            {album.follows} Follows
          </p>
        </div>
      </div>
      <div className="flex justify-end text-white">
        <Stack spacing={1}>
          <div className="text-white">
            <Pagination
              sx={{ "& .MuiPaginationItem-root": { color: "white", backgroundColor:'#34C94B', borderRadius:'50%' } }}
              count={totalPages}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleEvent}
            />
          </div>
        </Stack>
      </div>
      <div className="text-white">
        <div className="grid grid-cols-3">
          <p className="text-left">Title</p>
          <p className="text-left">Artist</p>
          <p className="text-right">Duration</p>
        </div>
        {currentSongs.map((song) => (
          <button key={song.id} className="grid grid-cols-3 items-center mb-5 border-b pb-5 border-white" onClick={handleClick}>
            <div className="w-1/5 text-pretty md:text-nowrap text-xs font-semibold flex items-center gap-2">
              <img
                src={song.image}
                alt="album cover"
                className="w-3/5 rounded-xl object-cover shadow-md shadow-white/50"
              />
              {song.title}
            </div>
            <div className="text-left text-sm">{song.artists}</div>
            <div className="text-right">{Math.floor(song.durationInMs / 1000)} sec</div>
          </button>
        ))}
      </div>
      {play && <Musicplayer />}
    </div>
  );
}
