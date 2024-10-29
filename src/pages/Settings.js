import { IoSettings } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";

const Settings = () => {
  return (
    <section id={"settings"} className="bg-neutral-950 p-6">
      <div className="">
        <h1 className="text-5xl py-5 text-white">Settings</h1>
        <hr />
      </div>
      <div className="flex justify-between items-start bg-neutral-950 text-white min-h-[75vh] p-5">
        <div className="basis-1/4 h-[70vh] overflow-auto bg-galvin-grey m-2 rounded-md">
          <div className="side-container container max-h-[74%] overflow-y-auto scrollbar-thinscrollbar-thumb-gray-500 scrollbar-track-gray-900 hover:scrollbar-thumb-gray-400">
            <NavLink
              to={`/settings/`}
              className="flex justify-start items-center p-2 hover:bg-galvin-green"
            >
              <div className="m-2 text-xl">
                <IoSettings />
              </div>
              <div className="m-2 text-xl">Settings</div>
            </NavLink>
            <NavLink
              to={`/settings/create-playlist`}
              className="flex justify-start items-center p-2 hover:bg-galvin-green"
            >
              <div className="m-2 text-xl">
                <IoSettings />
              </div>
              <div className="m-2 text-xl">Create Playlist</div>
            </NavLink>
            <NavLink
              to={`/settings/create-album`}
              className="flex justify-start items-center p-2 hover:bg-galvin-green"
            >
              <div className="m-2 text-xl">
                <IoSettings />
              </div>
              <div className="m-2 text-xl">Create Album</div>
            </NavLink>
            <NavLink
              to={`/settings/upload-song`}
              className="flex justify-start items-center p-2 hover:bg-galvin-green"
            >
              <div className="m-2 text-xl">
                <IoSettings />
              </div>
              <div className="m-2 text-xl">Upload Song</div>
            </NavLink>
          </div>
        </div>

        <div className="basis-3/4 h-[70vh] overflow-auto bg-galvin-bg m-2 rounded-md">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Settings;
