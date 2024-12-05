import { NavLink } from "react-router-dom";
import { FaFire } from "react-icons/fa";
import { BiSolidBookHeart } from "react-icons/bi";
import { SlSpeedometer } from "react-icons/sl";
import DisplayCard from "../components/DisplayCard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPlaylist } from "../store/thunk/playlistThunk";
import { getAllTrendingSongs } from "../store/thunk/songThunk";
import { getAllArtists } from "../store/thunk/userThunk";

const HomeTiles = () => {
  const [allTrendingSongs, setAllTrendingSongs] = useState([]);
  const [allPlaylist, setAllPlaylist] = useState([]);
  const [allArtists, setAllArtists] = useState([]);
  const [page] = useState(0);
  const [limit] = useState(5);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAllHomeData() {
      try {
        const allPlaylistResp = await dispatch(
          getAllPlaylist({ page, limit })
        ).unwrap();
        setAllPlaylist(allPlaylistResp.playlists);

        const allSongResp = await dispatch(
          getAllTrendingSongs({ page, limit })
        ).unwrap();
        setAllTrendingSongs(allSongResp.songs);

        const allArtistResp = await dispatch(
          getAllArtists({ page, limit })
        ).unwrap();
        setAllArtists(allArtistResp.artists);
      } catch (error) {
        console.log("Error in fetching home data: ", error);
      }
    }
    fetchAllHomeData();
  }, [limit, page, dispatch]);

  return (
    <section>
      <div className="container p-5">
        <div>
          <h1 className="text-4xl my-5 flex justify-start items-center">
            <FaFire />
            &nbsp;Trending Songs
          </h1>
          <div className="flex justify-end">
            <div className=" hover:text-galvin-green hover:underline cursor-pointer">
              <NavLink to={`/trending-songs`}>Show More</NavLink>
            </div>
          </div>
        </div>
        <div className="container flex justify-between items-center overflow-x-hidden">
          {allTrendingSongs.length <= 0 && <div>No Songs Available</div>}
          {allTrendingSongs &&
            allTrendingSongs.map((song) => (
              <DisplayCard type="song" key={song._id} song={song} />
            ))}
        </div>
      </div>
      <div className="container p-5">
        <div>
          <h1 className="text-4xl my-5 flex justify-start items-center">
            <SlSpeedometer /> &nbsp; Popular Artists
          </h1>
          <div className="flex justify-end">
            <div className=" hover:text-galvin-green hover:underline cursor-pointer">
              <NavLink to={`/artists`}>Show More</NavLink>
            </div>
          </div>
        </div>
        <div className="container flex justify-between items-center overflow-x-hidden">
          {allArtists.length <= 0 && <div>No Artists Available</div>}
          {allArtists &&
            allArtists.map((artist) => (
              <DisplayCard type="artist" key={artist._id} artist={artist} />
            ))}
        </div>
      </div>
      <div className="container p-5">
        <div>
          <h1 className="text-4xl my-5 flex justify-start items-center">
            <BiSolidBookHeart /> &nbsp; Most Favourite Playlist
          </h1>
          <div className="flex justify-end">
            <div className=" hover:text-galvin-green hover:underline cursor-pointer">
              <NavLink to={{ pathname: "/playlists", search: "?limit=10" }}>
                Show More
              </NavLink>
            </div>
          </div>
        </div>
        <div className="container flex justify-between items-center overflow-x-hidden">
          {allPlaylist.length <= 0 && <div>No Playlists Available</div>}
          {allPlaylist &&
            allPlaylist.map((playlist) => (
              <DisplayCard
                type="playlist"
                key={playlist._id}
                playlist={playlist}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTiles;
