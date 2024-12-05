import { VscLibrary } from "react-icons/vsc";
import { IoMdAdd } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import PlaylistSidemenu from "./PlaylistSidemenu";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlaylistOfUser } from "../store/thunk/playlistThunk";

const favCollection = {
  id: "liked",
  name: "Liked Songs",
  type: "Playlist",
  creator: "Aadesh Singh",
  totalSongs: "0",
  selected: false,
};

const Sidebar = (props) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarSearchVisible, setIsSidebarSearchvisible] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [PlaylistArray, setPlaylistArray] = useState([favCollection]);
  const searchRef = useRef(null);
  const searchClickHandler = () => {
    setIsSidebarSearchvisible((prev) => !prev);
  };

  const toggleFilterDropdown = () => {
    setIsFilterOpen((prev) => !prev);
  };

  useEffect(() => {
    //getAllPlaylistOfUserFn
    if (isAuthenticated) {
      const getAllPlaylistOfUserFn = async () => {
        try {
          const resp = await dispatch(getAllPlaylistOfUser()).unwrap();
          console.log("Resp in Getting User Playlist", resp);
          setPlaylistArray([favCollection, ...resp.playlists]);
        } catch (err) {
          console.log("Error in getting User Playlist", err);
        }
      };
      getAllPlaylistOfUserFn();
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click was outside the search element and the input is visible
      if (
        isSidebarSearchVisible &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        searchClickHandler(); // This will close the search input
      }
    };
    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener on Component Unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarSearchVisible]);

  const handlePlaylistClick = (index, id) => {
    // console.log("Id Click", id);
    PlaylistArray.forEach((playlist) => {
      if (playlist._id === id) {
        playlist.selected = true;
        navigate(`/playlist/${index === 0 ? "liked" : playlist._id}`);
      } else {
        playlist.selected = false;
      }
    });
  };

  return (
    <section className={`${props.className} bg-galvin-bg m-2 p-5 rounded-md`}>
      {/* Top section: Your Library and Add button */}
      <div className="container flex justify-between items-center">
        <NavLink to={`/library`}>
          <div className="container flex justify-between items-center cursor-pointer hover:text-galvin-green">
            <div className="m-2">
              <VscLibrary />
            </div>
            <div className="m-2">Your Library</div>
          </div>
        </NavLink>
        <div className="">
          <div className="m-2 hover:text-galvin-green cursor-pointer">
            <IoMdAdd />
          </div>
        </div>
      </div>

      {/* Search container */}
      <div className="container mt-4 flex items-center justify-between">
        <div className="" ref={searchRef}>
          {!isSidebarSearchVisible && (
            <FiSearch
              onClick={searchClickHandler}
              className="text-white cursor-pointer hover:text-galvin-green w-5 h-5"
            />
          )}
          {isSidebarSearchVisible && (
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 border-none rounded-lg text-white p-2 outline-none w-full"
              autoFocus
            />
          )}
        </div>
        <div className="relative inline-block text-left">
          {!isSidebarSearchVisible && (
            <div className="flex items-center justify-between">
              <span className="m-2">Recent</span>
              <span className="m-2" onClick={toggleFilterDropdown}>
                <RxHamburgerMenu />
              </span>
            </div>
          )}
          {isSidebarSearchVisible && (
            <div onClick={toggleFilterDropdown}>
              <RxHamburgerMenu />
            </div>
          )}
          {/* Dropdown Menu */}
          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#3d3c3c] text-white  rounded-md shadow-lg z-10">
              <div className="py-1">
                <div
                  className="block px-4 py-2 text-sm cursor-pointer"
                  onClick={toggleFilterDropdown}
                >
                  Recent
                </div>
                <div
                  className="block px-4 py-2 text-sm cursor-pointer"
                  onClick={toggleFilterDropdown}
                >
                  Recently Added
                </div>
                <div
                  className="block px-4 py-2 text-sm cursor-pointer"
                  onClick={toggleFilterDropdown}
                >
                  Alphabetical
                </div>
                <div
                  className="block px-4 py-2 text-sm cursor-pointer"
                  onClick={toggleFilterDropdown}
                >
                  Creator
                </div>
              </div>
              <hr />
              <div className="py-1 border-t-slate-200">
                <div className="flex justify-between items-center px-4 py-2 text-sm text-galvin-green ">
                  <div className="flex justify-between items-center cursor-pointer">
                    <span className="">
                      <RxHamburgerMenu />
                    </span>
                    <span className="mx-2">List</span>
                  </div>
                  <div>
                    <FaCheck />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Side menu playlist */}
      <div className="side-container container max-h-[74%] overflow-y-auto scrollbar-thinscrollbar-thumb-gray-500 scrollbar-track-gray-900 hover:scrollbar-thumb-gray-400">
        {PlaylistArray.map((playlist, index) => (
          <PlaylistSidemenu
            onClick={() => {
              handlePlaylistClick(index, playlist._id);
            }}
            playlist={playlist}
            key={playlist._id}
          />
        ))}
      </div>
    </section>
  );
};

export default Sidebar;
