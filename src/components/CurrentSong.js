import { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaRandom,
  FaVolumeUp,
  FaExpandAlt,
  FaVolumeMute,
} from "react-icons/fa";
import { IoIosRepeat } from "react-icons/io";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const CurrentSong = () => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { currentSong } = useSelector((state) => state.song);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  // const [song, setSong] = useState({});
  // setSong(currentSong);
  // console.log("current song: ", currentSong);

  // commet for time being
  useEffect(() => {
    if (currentSong?.playableUrl) {
      handlePlayPause();
    }
  }, [currentSong]);

  const handlePlayPause = () => {
    if (!playing) {
      setPlaying(true);
      return audioRef.current?.play();
    } else {
      setPlaying(false);
      return audioRef.current?.pause();
    }
  };

  // Format time to mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSliderChange = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(+newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleMute = () => {
    if (volume > 0) {
      setVolume(0);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    } else {
      setVolume(0.75);
      if (audioRef.current) {
        audioRef.current.volume = 0.75;
      }
    }
  };

  return (
    <section className="bg-galvin-bg text-white p-1">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong?.playableUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        controls={false} // We are managing the controls manually
      />

      <div className=" text-white p-1 flex justify-between items-center">
        {/* Left Section: Song Info */}
        <div className="flex items-center gap-4">
          {/* Album Image */}
          {/* <img
            src="/music-512-removebg-preview.png"
            alt="Album Cover"
            className="w-16 h-16 object-cover rounded"
          /> */}
          <div
            style={{
              width: "35px",
              height: "35px",
              backgroundColor: "#4CB050",
              maskImage: "url('/image/cd.png')",
              maskSize: "cover",
              maskRepeat: "no-repeat",
              WebkitMaskImage: "url('/image/cd.png')",
              WebkitMaskSize: "cover",
              WebkitMaskRepeat: "no-repeat",
            }}
          ></div>

          {/* Song Details */}
          <div className="flex flex-col">
            <span className="text-lg font-semibold">
              {currentSong?.name || "Play Song"}
            </span>
            <span className="text-gray-400 text-sm">
              {currentSong?.singers.map((singer) => (
                <NavLink key={singer} to={`/artist/${singer}`}>
                  {singer}
                </NavLink>
              ))}
            </span>
          </div>
        </div>

        {/* Middle Section: Player Controls */}
        <div className="flex flex-col items-center gap-2 w-2/4">
          {/* Player Icons */}
          <div className="flex justify-center items-center gap-6">
            <FaRandom className="text-gray-400 cursor-pointer hover:text-white" />
            <FaStepBackward className="text-gray-400 cursor-pointer hover:text-white" />

            {/* Play / Pause Button */}
            <div
              className="bg-white text-black p-3 rounded-full cursor-pointer"
              onClick={handlePlayPause}
            >
              {playing && <FaPause className="text-2xl" />}
              {!playing && <FaPlay className="text-2xl" />}
              {/* Replace FaPause with FaPlay for play icon */}
            </div>

            <FaStepForward className="text-gray-400 cursor-pointer hover:text-white" />
            <IoIosRepeat className="text-gray-400 cursor-pointer hover:text-white" />
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full text-gray-400 text-sm">
            {/* Current Time */}
            <span>{formatTime(currentTime)}</span>

            {/* Progress Slider */}
            <input
              type="range"
              className="w-full bg-gray-700 cursor-pointer"
              value={currentTime}
              max={duration || 0} // Avoid NaN when duration isn't loaded
              onChange={handleSliderChange}
            />

            {/* Total Time */}
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right Section: Additional Controls */}
        <div className="flex items-center gap-4">
          {/* Additional Icons */}

          {volume !== 0 && (
            <FaVolumeUp
              className="text-gray-400 cursor-pointer hover:text-white"
              onClick={handleMute}
            />
          )}
          {volume === 0 && (
            <FaVolumeMute
              className="text-gray-400 cursor-pointer hover:text-white"
              onClick={handleMute}
            />
          )}

          {/* Volume Slider */}
          <input
            type="range"
            className="w-20 bg-gray-700 cursor-pointer"
            value={volume}
            min="0"
            max="1"
            step="0.01"
            onChange={handleVolumeChange}
          />

          {/* Expand Button */}
          <FaExpandAlt className="text-gray-400 cursor-pointer hover:text-white" />
        </div>
      </div>
    </section>
  );
};

export default CurrentSong;
