import { useNavigate } from "react-router-dom";
import DisplayCard from "./DisplayCard";
import { MdKeyboardBackspace } from "react-icons/md";
import { BiSolidBookHeart } from "react-icons/bi";
import { SlSpeedometer } from "react-icons/sl";
import { FaFire } from "react-icons/fa";

const List = (props) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <div>
        <button
          onClick={handleGoBack}
          className="flex items-center hover:text-galvin-green"
        >
          <span className="text-2xl">
            <MdKeyboardBackspace />
          </span>
          <span>Back</span>
        </button>
      </div>

      {/* Playlist */}
      {props.type === "playlist" && (
        <h1 className="text-4xl my-5 flex justify-start items-center">
          <BiSolidBookHeart /> &nbsp; Most Favourite Playlist
        </h1>
      )}
      <div className="flex flex-wrap justify-start gap-2">
        {props.type === "playlist" && props.iterable.length <= 0 && (
          <div>No Playlist Available to show.</div>
        )}
        {props.type === "playlist" &&
          props.iterable &&
          props.iterable.map((item) => (
            <DisplayCard key={item._id} type="playlist" playlist={item} />
          ))}
      </div>

      {/* Artist */}
      {props.type === "artist" && (
        <h1 className="text-4xl my-5 flex justify-start items-center">
          <SlSpeedometer /> &nbsp; Popular Artists
        </h1>
      )}
      <div className="flex flex-wrap justify-start gap-2">
        {props.type === "artist" && props.iterable.length <= 0 && (
          <div>No Artists Available to show.</div>
        )}
        {props.type === "artist" &&
          props.iterable &&
          props.iterable.map((item) => (
            <DisplayCard key={item._id} type="artist" artist={item} />
          ))}
      </div>

      {/* Song */}
      {/* {props.type === "song" && (
        <h1 className="text-4xl my-5 flex justify-start items-center">
          <SlSpeedometer /> &nbsp; Popular Songs
        </h1>
      )}
      <div className="flex flex-wrap justify-start gap-2">
        {props.type === "song" && props.iterable.length <= 0 && <div>No Songs Available to show.</div>}
        {props.type === "song" &&
          props.iterable &&
          props.iterable.map((item) => (
            <DisplayCard key={item._id} type="song" song={item} />
          ))}
      </div> */}

      {/* songs */}
      <div>
        {props.type === "song" && (
          <h1 className="text-4xl my-5 flex justify-start items-center">
            <FaFire />
            &nbsp;Trending Songs
          </h1>
        )}
        <div className="flex flex-wrap justify-start gap-2">
          {props.type === "song" && props.iterable.length <= 0 && (
            <div>No Songs Available to show.</div>
          )}
          {props.type === "song" &&
            props.iterable &&
            props.iterable.map((item) => (
              <DisplayCard key={item._id} type="song" song={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default List;
