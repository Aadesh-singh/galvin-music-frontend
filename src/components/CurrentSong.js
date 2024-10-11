import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaRandom,
  FaRedoAlt,
  FaVolumeUp,
  FaExpandAlt,
} from "react-icons/fa";
import { IoIosRepeat } from "react-icons/io";

const CurrentSong = () => {
  return (
    <section className="bg-galvin-bg text-white p-1">
      <div className=" text-white p-1 flex justify-between items-center">
        {/* Left Section: Song Info */}
        <div className="flex items-center gap-4">
          {/* Album Image */}
          <img
            src="/music-512-removebg-preview.png"
            alt="Album Cover"
            className="w-16 h-16 object-cover rounded"
          />

          {/* Song Details */}
          <div className="flex flex-col">
            <span className="text-lg font-semibold">O Saathi</span>
            <span className="text-gray-400 text-sm">Atif Aslam, Arko</span>
          </div>

          {/* Add Icon */}
          <FaPlay className="text-xl cursor-pointer" />
        </div>

        {/* Middle Section: Player Controls */}
        <div className="flex flex-col items-center gap-2 w-2/4">
          {/* Player Icons */}
          <div className="flex justify-center items-center gap-6">
            <FaRandom className="text-gray-400 cursor-pointer hover:text-white" />
            <FaStepBackward className="text-gray-400 cursor-pointer hover:text-white" />

            {/* Play / Pause Button */}
            <div className="bg-white text-black p-3 rounded-full cursor-pointer">
              <FaPause className="text-2xl" />{" "}
              {/* Replace FaPause with FaPlay for play icon */}
            </div>

            <FaStepForward className="text-gray-400 cursor-pointer hover:text-white" />
            <IoIosRepeat className="text-gray-400 cursor-pointer hover:text-white" />
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full text-gray-400 text-sm">
            {/* Current Time */}
            <span>0:41</span>

            {/* Progress Slider */}
            <input
              type="range"
              className="w-full bg-gray-700 cursor-pointer"
              value="30"
              max="100"
            />

            {/* Total Time */}
            <span>4:11</span>
          </div>
        </div>

        {/* Right Section: Additional Controls */}
        <div className="flex items-center gap-4">
          {/* Additional Icons */}
          <FaPlay className="text-gray-400 cursor-pointer hover:text-white" />
          <FaVolumeUp className="text-gray-400 cursor-pointer hover:text-white" />

          {/* Volume Slider */}
          <input
            type="range"
            className="w-20 bg-gray-700 cursor-pointer"
            value="50"
            max="100"
          />

          {/* Expand Button */}
          <FaExpandAlt className="text-gray-400 cursor-pointer hover:text-white" />
        </div>
      </div>
    </section>
  );
};

export default CurrentSong;
