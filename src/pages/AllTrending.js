import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllTrendingSongs } from "../store/thunk/songThunk";
import List from "../components/List";

const AllTrending = (props) => {
  const dispatch = useDispatch();
  const [allTendingSongs, setAllTrendingSongs] = useState([]);
  const [page] = useState(0);
  const [limit] = useState(10);

  useEffect(() => {
    const fetchAllTrendinSongs = async () => {
      try {
        const resp = await dispatch(
          getAllTrendingSongs({ page, limit })
        ).unwrap();
        console.log("resp of getAllTrendingSongs: ", resp);
        setAllTrendingSongs(resp.songs);
      } catch (err) {
        console.log("Error in fetching all TrendingSongs: ", err);
      }
    };
    fetchAllTrendinSongs();
  }, [dispatch, limit, page]);

  return (
    <>
      <List type="song" iterable={allTendingSongs} />
    </>
  );
};

export default AllTrending;
