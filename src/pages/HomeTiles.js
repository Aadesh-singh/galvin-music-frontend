import { NavLink } from "react-router-dom";
import { FaFire } from "react-icons/fa";
import { BiSolidBookHeart } from "react-icons/bi";
import { SlSpeedometer } from "react-icons/sl";

const HomeTiles = () => {
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
          <div className="mx-2">
            <div className="img-container w-[150px] h-[150px] my-5 overflow-hidden">
              <img
                src="/image/millionare.jpg"
                alt="artist"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="text-galvin-text-grey hover:text-galvin-green hover:underline">
              <div className="cursor-pointer">Millionare</div>
            </div>
            <div className="text-galvin-text-grey hover:text-galvin-green hover:underline">
              <NavLink to={`/artist/yoyohoneysingh}`}>
                Yo Yo Honey Singh
              </NavLink>
            </div>
            <div className="text-galvin-text-grey">Song</div>
          </div>
          <div className="mx-2">
            <div className="img-container w-[150px] h-[150px] my-5 overflow-hidden">
              <img
                src="/image/millionare.jpg"
                alt="artist"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="text-galvin-text-grey hover:text-galvin-green hover:underline">
              <div className="cursor-pointer">Millionare</div>
            </div>
            <div className="text-galvin-text-grey hover:text-galvin-green hover:underline">
              <NavLink to={`/artist/yoyohoneysingh}`}>
                Yo Yo Honey Singh
              </NavLink>
            </div>
            <div className="text-galvin-text-grey">Song</div>
          </div>
          <div className="mx-2">
            <div className="img-container w-[150px] h-[150px] my-5 overflow-hidden">
              <img
                src="/image/millionare.jpg"
                alt="artist"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="text-galvin-text-grey hover:text-galvin-green hover:underline">
              <div className="cursor-pointer">Millionare</div>
            </div>
            <div className="text-galvin-text-grey hover:text-galvin-green hover:underline">
              <NavLink to={`/artist/yoyohoneysingh}`}>
                Yo Yo Honey Singh
              </NavLink>
            </div>
            <div className="text-galvin-text-grey">Song</div>
          </div>
          <div className="mx-2">
            <div className="img-container w-[150px] h-[150px] my-5 overflow-hidden">
              <img
                src="/image/millionare.jpg"
                alt="artist"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="text-galvin-text-grey hover:text-galvin-green hover:underline">
              <div className="cursor-pointer">Millionare</div>
            </div>
            <div className="text-galvin-text-grey hover:text-galvin-green hover:underline">
              <NavLink to={`/artist/yoyohoneysingh}`}>
                Yo Yo Honey Singh
              </NavLink>
            </div>
            <div className="text-galvin-text-grey">Song</div>
          </div>
          <div className="mx-2">
            <div className="img-container w-[150px] h-[150px] my-5 overflow-hidden">
              <img
                src="/image/millionare.jpg"
                alt="artist"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="text-galvin-text-grey hover:text-galvin-green hover:underline">
              <div className="cursor-pointer">Millionare</div>
            </div>
            <div className="text-galvin-text-grey hover:text-galvin-green hover:underline">
              <NavLink to={`/artist/yoyohoneysingh}`}>
                Yo Yo Honey Singh
              </NavLink>
            </div>
            <div className="text-galvin-text-grey">Artist</div>
          </div>
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
          <div className="mx-2">
            <div className="img-container w-[150px] h-[150px] my-5 overflow-hidden">
              <img
                src="/image/yoyohoney.jpg"
                alt="artist"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="hover:text-galvin-green hover:underline">
              <NavLink to={`/artist/yoyohoneysingh}`}>
                Yo Yo Honey Singh
              </NavLink>
            </div>
            <div className="text-galvin-text-grey">Artist</div>
          </div>
          <div className="mx-2">
            <div className="img-container w-[150px] h-[150px] my-5 overflow-hidden">
              <img
                src="/image/yoyohoney.jpg"
                alt="artist"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="hover:text-galvin-green hover:underline">
              <NavLink to={`/artist/yoyohoneysingh}`}>
                Yo Yo Honey Singh
              </NavLink>
            </div>
            <div className="text-galvin-text-grey">Artist</div>
          </div>
          <div className="mx-2">
            <div className="img-container w-[150px] h-[150px] my-5 overflow-hidden">
              <img
                src="/image/yoyohoney.jpg"
                alt="artist"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="hover:text-galvin-green hover:underline">
              <NavLink to={`/artist/yoyohoneysingh}`}>
                Yo Yo Honey Singh
              </NavLink>
            </div>
            <div className="text-galvin-text-grey">Artist</div>
          </div>
          <div className="mx-2">
            <div className="img-container w-[150px] h-[150px] my-5 overflow-hidden">
              <img
                src="/image/yoyohoney.jpg"
                alt="artist"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="hover:text-galvin-green hover:underline">
              <NavLink to={`/artist/yoyohoneysingh}`}>
                Yo Yo Honey Singh
              </NavLink>
            </div>
            <div className="text-galvin-text-grey">Artist</div>
          </div>
          <div className="mx-2">
            <div className="img-container w-[150px] h-[150px] my-5 overflow-hidden">
              <img
                src="/image/yoyohoney.jpg"
                alt="artist"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="hover:text-galvin-green hover:underline">
              <NavLink to={`/artist/yoyohoneysingh}`}>
                Yo Yo Honey Singh
              </NavLink>
            </div>
            <div className="text-galvin-text-grey">Artist</div>
          </div>
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
          <div className="mx-2">
            <div className="img-container w-[150px] h-[150px] my-5 overflow-hidden">
              <img
                src="/image/playlist.jpg"
                alt="artist"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="hover:text-galvin-green hover:underline">
              <NavLink to={`/playlist/123}`}>Glory</NavLink>
            </div>
            <div className="hover:text-galvin-green hover:underline">
              <NavLink to={`/artist/123}`}>Aadesh Singh</NavLink>
            </div>
            <div className="text-galvin-text-grey">Playlist</div>
          </div>
          <div className="mx-2">
            <div className="img-container w-[150px] h-[150px] my-5 overflow-hidden">
              <img
                src="/image/playlist.jpg"
                alt="artist"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="hover:text-galvin-green hover:underline">
              <NavLink to={`/playlist/123}`}>Glory</NavLink>
            </div>
            <div className="hover:text-galvin-green hover:underline">
              <NavLink to={`/artist/123}`}>Aadesh Singh</NavLink>
            </div>
            <div className="text-galvin-text-grey">Playlist</div>
          </div>
          <div className="mx-2">
            <div className="img-container w-[150px] h-[150px] my-5 overflow-hidden">
              <img
                src="/image/playlist.jpg"
                alt="artist"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="hover:text-galvin-green hover:underline">
              <NavLink to={`/playlist/123}`}>Glory</NavLink>
            </div>
            <div className="hover:text-galvin-green hover:underline">
              <NavLink to={`/artist/123}`}>Aadesh Singh</NavLink>
            </div>
            <div className="text-galvin-text-grey">Playlist</div>
          </div>
          <div className="mx-2">
            <div className="img-container w-[150px] h-[150px] my-5 overflow-hidden">
              <img
                src="/image/playlist.jpg"
                alt="artist"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="hover:text-galvin-green hover:underline">
              <NavLink to={`/playlist/123}`}>Glory</NavLink>
            </div>
            <div className="hover:text-galvin-green hover:underline">
              <NavLink to={`/artist/123}`}>Aadesh Singh</NavLink>
            </div>
            <div className="text-galvin-text-grey">Playlist</div>
          </div>
          <div className="mx-2">
            <div className="img-container w-[150px] h-[150px] my-5 overflow-hidden">
              <img
                src="/image/playlist.jpg"
                alt="artist"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="hover:text-galvin-green hover:underline">
              <NavLink to={`/playlist/123}`}>Glory</NavLink>
            </div>
            <div className="hover:text-galvin-green hover:underline">
              <NavLink to={`/artist/123}`}>Aadesh Singh</NavLink>
            </div>
            <div className="text-galvin-text-grey">Playlist</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTiles;
