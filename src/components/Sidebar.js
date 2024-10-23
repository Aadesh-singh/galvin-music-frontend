import { VscLibrary } from "react-icons/vsc";
import { IoMdAdd } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import PlaylistSidemenu from "./PlaylistSidemenu";

const PlaylistArray = [
  {
    id: "liked",
    name: "Liked Songs",
    type: "Playlist",
    creator: "Aadesh Singh",
    totalSongs: "0",
    selected: false,
  },
  {
    id: "1",
    name: "Playlist1",
    type: "Playlist",
    creator: "Aadesh Singh",
    totalSongs: "0",
    selected: false,
  },
  {
    id: "2",
    name: "Playlist2",
    type: "Playlist",
    creator: "Aadesh Singh",
    totalSongs: "0",
    selected: false,
  },
  {
    id: "3",
    name: "Playlist3",
    type: "Playlist",
    creator: "Aadesh Singh",
    totalSongs: "0",
    selected: false,
  },
  {
    id: "4",
    name: "Playlist4",
    type: "Playlist",
    creator: "Aadesh Singh",
    totalSongs: "0",
    selected: false,
  },
];

const Sidebar = (props) => {
  const navigate = useNavigate();
  const [isSidebarSearchVisible, setIsSidebarSearchvisible] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchRef = useRef(null);
  const searchClickHandler = () => {
    setIsSidebarSearchvisible((prev) => !prev);
  };

  const toggleFilterDropdown = () => {
    setIsFilterOpen((prev) => !prev);
  };

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
      // Cleanup the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarSearchVisible]);

  const handlePlaylistClick = (index, id) => {
    console.log("id click", id);
    PlaylistArray.forEach((playlist) => {
      if (playlist.id === id) {
        playlist.selected = true;
        navigate("/playlist/" + playlist.id);
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
              handlePlaylistClick(index, playlist.id);
            }}
            playlist={playlist}
            key={playlist.id}
          />
        ))}
      </div>
    </section>
  );
};

export default Sidebar;
