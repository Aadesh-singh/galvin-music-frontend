import { NavLink } from "react-router-dom";

const DisplayCard = ({ type, playlist, artist, song }) => {
  return (
    <div className="mx-4">
      <div className="img-container w-[150px] h-[150px] my-5 overflow-hidden">
        {/* Dynamic images */}
        {type === "playlist" && (
          <img
            src="/image/playlist.jpg"
            alt="artist"
            className="w-full h-full object-cover rounded-full"
          />
        )}
        {type === "song" && (
          // <img

          //   src={"/image/cd.png"}
          //   // src={song.coverPhotoUrl}
          //   alt="artist"
          //   className="w-full h-full object-cover rounded-full"
          // />
          <div
            style={{
              width: "135px",
              height: "135px",
              backgroundColor: "#4CB050",
              maskImage: "url('/image/cd.png')",
              maskSize: "cover",
              maskRepeat: "no-repeat",
              WebkitMaskImage: "url('/image/cd.png')",
              WebkitMaskSize: "cover",
              WebkitMaskRepeat: "no-repeat",
            }}
          ></div>
        )}
        {type === "artist" && (
          <img
            // src={artist.profileUrl || "/image/user.png"}
            src={"/image/user.png"}
            alt="artist"
            className="w-full h-full object-cover rounded-full"
          />
        )}
      </div>

      {/* Links and name */}
      {type === "playlist" && (
        <>
          <div className="hover:text-galvin-green hover:underline">
            <NavLink to={`/playlist/123}`}>{playlist.name}</NavLink>
          </div>
          <div className="hover:text-galvin-green hover:underline">
            <NavLink to={`/artist/123}`}>{playlist.author}</NavLink>
          </div>
          <div className="text-galvin-text-grey">{type}</div>
        </>
      )}
      {/* {type === "album" && (
        <>
          <div className="hover:text-galvin-green hover:underline">
            <NavLink to={`/playlist/123}`}>{playlist.name}</NavLink>
          </div>
          <div className="hover:text-galvin-green hover:underline">
            <NavLink to={`/artist/123}`}>{playlist.author}</NavLink>
          </div>
          <div className="text-galvin-text-grey">{type}</div>
        </>
      )} */}
      {type === "song" && (
        <>
          <div className="text-galvin-text-grey hover:text-galvin-green hover:underline">
            <div className="cursor-pointer">{song.name}</div>
          </div>
          <div className="text-galvin-text-grey hover:text-galvin-green hover:underline">
            {song.singers.map((singer) => (
              <NavLink key={singer} to={`/artist/${singer}`}>
                {singer}
                {","}&nbsp;
              </NavLink>
            ))}
          </div>
          <div className="text-galvin-text-grey">Song</div>
        </>
      )}
      {type === "artist" && (
        <>
          <div className="hover:text-galvin-green hover:underline">
            <NavLink to={`/artist/${artist._id}`}>
              {artist.firstName}&nbsp;{artist.lastName}
            </NavLink>
          </div>
          <div className="text-galvin-text-grey">Artist</div>
        </>
      )}
    </div>
  );
};

export default DisplayCard;
