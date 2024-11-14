import { BiSolidPlaylist } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import { TiPin } from "react-icons/ti";
import { FaHeart } from "react-icons/fa";
import { AiOutlinePlayCircle } from "react-icons/ai";

const PlaylistSidemenu = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`${
        props.playlist.selected === true ? "bg-[#3d3c3c]" : "hover:bg-gray-700"
      } flex justify-start items-center gap-2 p-2 m-2  rounded-lg  cursor-pointer relative group`}
    >
      {/* Playlist Icon */}
      <div className="flex items-center justify-center relative bg-[#121212] p-5 rounded-md">
        {/* Conditional Content: Songs or Creator */}
        {props.playlist.name === "Liked Songs" ? (
          <FaHeart />
        ) : (
          <BiSolidPlaylist className=" text-white" />
        )}

        {/* Play Icon (appears on hover) */}
        {/* Play Icon (Only visible on hover) */}
        <AiOutlinePlayCircle className="text-black bg-[#f6f6f6] rounded-full text-3xl absolute inset-0 m-auto w-10 h-10 opacity-0 group-hover:opacity-100 -left-[0%] transition-opacity duration-300" />
      </div>

      {/* Playlist Details */}
      <div className="flex flex-col justify-center">
        {/* Playlist Name */}
        <div className="text-white font-semibold">{props.playlist.name}</div>

        {/* Playlist Type and Details */}
        <div className="flex items-center text-sm text-gray-300 gap-1">
          <div className="flex justify-center items-center">
            {props.playlist.name === "Liked Songs" && (
              <span className="m-[1px]">
                <TiPin />
              </span>
            )}
            <span className="m-[1px]">Playlist</span>
          </div>
          <GoDotFill className="w-2 h-2" />

          {/* Conditional Content: Songs or Creator */}
          {props.playlist.name === "Liked Songs" ? (
            <div className="text-[0.8rem]">
              {props.playlist.totalSongs} Songs
            </div>
          ) : (
            <div className="text-[0.8rem]">
              {props.playlist.owner.firstName}&nbsp;
              {props.playlist.owner.lastName}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistSidemenu;
