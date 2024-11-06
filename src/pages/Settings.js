import { IoSettings } from "react-icons/io5";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

const Settings = () => {
  const route = useLocation();
  const path = route.pathname.split("/").filter((segment) => segment !== "");
  const pathName = path[path.length - 1];
  console.log("pathName", pathName);

  return (
    <section id={"settings"} className="bg-neutral-950 p-2 h-[100vh]">
      <div className="w-full">
        <Header />
        <hr />
      </div>
      {/* <div className="">
        <h1 className="text-5xl py-5 text-white flex justify-start items-center">
          <span className="m-2">
            <IoSettings />
          </span>
          <span className="m-2">Settings</span>
        </h1>
        <hr />
      </div> */}
      <div className="flex justify-between items-start bg-neutral-950 text-white min-h-[75vh] p-5">
        <div className="basis-1/4 h-[70vh] overflow-auto bg-galvin-bg m-2 rounded-md">
          <div className="side-container container max-h-[74%] overflow-y-auto scrollbar-thinscrollbar-thumb-gray-500 scrollbar-track-gray-900 hover:scrollbar-thumb-gray-400 text-md">
            <NavLink
              to={`/settings/`}
              className={`flex justify-start items-center p-2 hover:bg-galvin-green ${
                pathName === "settings" ? "bg-galvin-green" : "" //marking background green if current route is selected
              }`}
            >
              <div className="m-2">
                <IoSettings />
              </div>
              <div className="m-2">Settings</div>
            </NavLink>
            <NavLink
              to={`/settings/create-playlist`}
              className={`flex justify-start items-center p-2 hover:bg-galvin-green ${
                pathName === "create-playlist" ? "bg-galvin-green" : ""
              }`}
            >
              <div className="m-2">
                <IoSettings />
              </div>
              <div className="m-2">Create Playlist</div>
            </NavLink>
            <NavLink
              to={`/settings/create-album`}
              className={`flex justify-start items-center p-2 hover:bg-galvin-green ${
                pathName === "create-album" ? "bg-galvin-green" : ""
              }`}
            >
              <div className="m-2">
                <IoSettings />
              </div>
              <div className="m-2">Create Album</div>
            </NavLink>
            <NavLink
              to={`/settings/upload-song`}
              className={`flex justify-start items-center p-2 hover:bg-galvin-green ${
                pathName === "upload-song" ? "bg-galvin-green" : ""
              }`}
            >
              <div className="m-2">
                <IoSettings />
              </div>
              <div className="m-2">Upload Song</div>
            </NavLink>
          </div>
        </div>

        <div className="side-container basis-3/4 h-[70vh] overflow-auto bg-galvin-bg m-2 rounded-md overflow-y-auto scrollbar-thinscrollbar-thumb-gray-500 scrollbar-track-gray-900 hover:scrollbar-thumb-gray-400">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Settings;
