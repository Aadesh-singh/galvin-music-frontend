import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPlaylist } from "../store/thunk/playlistThunk";
import List from "../components/List";

const AllPlaylists = () => {
  const [allPlaylists, setAllPlaylists] = useState([]);
  const [page] = useState(0);
  const [limit] = useState(25);
  const dispatch = useDispatch();

  useEffect(() => {
    //get all playlist
    const fetchAllPlaylist = async () => {
      try {
        const resp = await dispatch(
          getAllPlaylist({ page: page, limit: limit })
        ).unwrap();
        console.log("allPlaylists: ", resp);
        setAllPlaylists(resp.playlists);
      } catch (error) {
        console.log("error in fetching all playlist: ", error);
      }
    };

    fetchAllPlaylist();
  }, [dispatch, limit, page]);

  return (
    <>
      <List type="playlist" iterable={allPlaylists} />
    </>
  );
};

export default AllPlaylists;
