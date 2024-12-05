import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllArtists } from "../store/thunk/userThunk";
import List from "../components/List";

const AllArtist = () => {
  const dispatch = useDispatch();
  const [allArtists, setAllArtists] = useState([]);
  const [page] = useState(0);
  const [limit] = useState(0);

  useEffect(() => {
    const fetchAllArtists = async () => {
      try {
        const resp = await dispatch(getAllArtists({ page, limit })).unwrap();
        console.log("resp of fetchAllArtist: ", resp);
        setAllArtists(resp.artists);
      } catch (err) {
        console.log("Error in fetching all artists: ", err);
      }
    };
    fetchAllArtists();
  }, [dispatch, limit, page]);

  return (
    <>
      <List type="artist" iterable={allArtists} />
    </>
  );
};

export default AllArtist;
