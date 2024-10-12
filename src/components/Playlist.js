import { GoDotFill } from "react-icons/go";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";

import { NavLink } from "react-router-dom";

const Playlist = (props) => {
  const songs = [
    {
      title: "Sunn Raha Hai (Male Version)",
      artist: "Ankit Tiwari",
      album: "Aashiqui 2",
      date: "Mar 23, 2020",
      duration: "6:30",
    },
    {
      title: "Sunn Raha Hai (Female Version)",
      artist: "Shreya Ghoshal",
      album: "Aashiqui 2",
      date: "Mar 23, 2020",
      duration: "5:14",
    },
    {
      title: "Tum Hi Ho",
      artist: "Arijit Singh",
      album: "Aashiqui 2",
      date: "Mar 23, 2020",
      duration: "4:21",
    },
    {
      title: "Chahun Main Ya Naa",
      artist: "Arijit Singh",
      album: "Aashiqui 2",
      date: "Mar 23, 2020",
      duration: "5:04",
    },
  ];
  return (
    <div className="container">
      <div className="container bg-galvin-grey p-5 pt-20 rounded-md flex justify-between items-start">
        <div className="w-[120px] h-[120px] bg-[#3d3c3c] p-5 rounded-md">
          <img
            src="/music-512-removebg-preview.png"
            alt="Playlist"
            className="w-full h-full"
          />
        </div>
        <div className="container px-5">
          <h1 className="text-7xl font-extrabold mb-4">Feel the Music</h1>
          <div className="flex justify-start items-center">
            <div className="w-[20px] h-[20px] mr-2">
              <img
                src="/music-512-removebg-preview.png"
                alt="Playlist"
                className="w-full h-full"
              />
            </div>
            <div className=" mx-2 hover:text-galvin-green hover:underline cursor-pointer">
              <NavLink to="/artist/Aadesh-singh">Aadesh Singh</NavLink>
            </div>
            <GoDotFill className="w-2 h-2  mx-0" />
            <div className="mx-2">2024</div>
            <GoDotFill className="w-2 h-2  mx-0" />
            <div className=" mx-2">1234567</div>
          </div>
        </div>
      </div>
      <div className="container">
        {/* Playlist bottons */}
        <div className="container p-5 flex justify-start items-center w-[25%]">
          <div className="container flex justify-center items-center m-1">
            {/* Conditionally render one of them */}
            <div className="text-black text-xl mx-1 bg-galvin-green p-5 rounded-full cursor-pointer">
              <FaPlay />
            </div>
            <div className="text-black text-xl mx-1 bg-galvin-green p-5 rounded-full cursor-pointer">
              <FaPause />
            </div>
          </div>
          <div className="container flex m-1 justify-center items-center">
            {/* TODO: Conditionally redender one of two */}
            <div className="text-black text-lg bg-galvin-green p-2 rounded-full cursor-pointer">
              <FaCheck />
            </div>
            <div className="text-white text-4xl mx-2  rounded-full cursor-pointer">
              <IoIosAddCircleOutline />
            </div>
          </div>
          <div className="container flex m-1">
            <div className="text-3xl cursor-pointer">
              <MdOutlineMoreHoriz />
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="container">
          <div className="p-6">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 text-gray-400 p-3 border-b border-gray-600 pb-2">
              <div className="col-span-1">#</div>
              <div className="col-span-5">Title</div>
              <div className="col-span-2">Album</div>
              <div className="col-span-3">Date added</div>
              <div className="col-span-1 text-2xl px-5 py-0">
                <span className="flex justify-end">
                  <IoMdTime />
                </span>
              </div>
            </div>

            {/* Table Rows */}
            {songs.map((song, index) => (
              <div
                key={index}
                className={`grid grid-cols-12 gap-4 items-center p-3 rounded-lg hover:bg-gray-800 ${
                  index === 0 && "bg-gray-700"
                }`}
              >
                {/* Index */}
                <div className="col-span-1 text-gray-400 flex items-center">
                  {index === 0 ? (
                    <FaPlay className="text-green-400" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Song Title and Artist */}
                <div className="col-span-5 flex items-center">
                  <img
                    src="https://via.placeholder.com/40" // Replace with your image URL
                    alt="Album"
                    className="w-10 h-10 object-cover rounded-md mr-3"
                  />
                  <div>
                    <div className="text-white">{song.title}</div>
                    <div className="text-gray-400 text-sm">{song.artist}</div>
                  </div>
                </div>

                {/* Album */}
                <div className="col-span-2 text-gray-400">{song.album}</div>

                {/* Date added */}
                <div className="col-span-3 text-gray-400">{song.date}</div>

                {/* Duration and Actions */}
                <div className="col-span-1 text-gray-400 flex justify-end items-center gap-4">
                  <FiPlus className="cursor-pointer" />
                  <span>{song.duration}</span>
                  <BsThreeDots className="cursor-not-allowed" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
