import { NavLink } from "react-router-dom";
// import { FaMusic } from "react-icons/fa6";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { uploadSong } from "../store/thunk/songThunk";
import { toast } from "react-toastify";
import LoadingButton from "../ui/LoadingButton";
import useCookie from "../hooks/useCookie";
import { fetchPlaylistOfUser } from "../store/thunk/playlistThunk";

const UploadSong = () => {
  const { status: albumStatus } = useSelector((state) => state.album);
  const { status: playlistStatus } = useSelector((state) => state.playlist);

  const [fileName, setFileName] = useState("");
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("album");

  // const albums = ["Album A", "Album B", "Album C", "Album D"]; // List of album options
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const [userId, setUserId, removeUserId] = useCookie("userId");
  console.log("userId: ", userId);
  useEffect(() => {
    async function fetchAlbumPlaylist() {
      try {
        console.log("userId: ", userId);
        const response = await dispatch(fetchPlaylistOfUser({ id: userId }));
      } catch (error) {}
    }
    fetchAlbumPlaylist();
  }, [userId]);

  const handleAlbumChange = (event) => {
    const selected = event.target.value;
    // setSelectedAlbum(selected);
    console.log("Selected Album:", selected); // Logs selected album to console
  };

  // const playlists = ["Playlist A", "Playlist B", "Playlist C", "Playlist D"]; // List of album options

  const handlePlaylistChange = (event) => {
    const selected = event.target.value;
    // setSelectedAlbum(selected);
    console.log("Selected Playlist:", selected); // Logs selected album to console
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log("Selected:", event.target.value); // Logs selected value to the console
  };

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const { status } = useSelector((state) => state.auth);
  const [lyricByList, setLyricByList] = useState([]);
  const [musicByList, setMusicByList] = useState([]);
  const [singerList, setSingerList] = useState([]);

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  //lyrics
  const addLyricBy = (e) => {
    e.preventDefault();
    const newLyricBy = e.target.value.trim();
    if (newLyricBy && !lyricByList.includes(newLyricBy)) {
      const updatedList = [...lyricByList, newLyricBy];
      setLyricByList(updatedList);
      setValue("lyricsby", updatedList); // Update form value
      e.target.value = ""; // Clear input field
    }
  };

  const removeLyricBy = (item) => {
    const updatedList = lyricByList.filter((lyric) => lyric !== item);
    setLyricByList(updatedList);
    setValue("lyricsby", updatedList);
  };

  //musicby
  const addMusicBy = (e) => {
    e.preventDefault();
    const newMusicBy = e.target.value.trim();
    if (newMusicBy && !musicByList.includes(newMusicBy)) {
      const updatedList = [...musicByList, newMusicBy];
      setMusicByList(updatedList);
      setValue("musicby", updatedList); // Update form value
      e.target.value = ""; // Clear input field
    }
  };

  const removeMusicBy = (item) => {
    const updatedList = musicByList.filter((music) => music !== item);
    setMusicByList(updatedList);
    setValue("musicby", updatedList);
  };

  //singers
  const addSinger = (e) => {
    e.preventDefault();
    const newSinger = e.target.value.trim();
    if (newSinger && !singerList.includes(newSinger)) {
      const updatedList = [...singerList, newSinger];
      setSingerList(updatedList);
      setValue("singers", updatedList, { shouldValidate: true }); // Update form value
      // trigger("singers");
      e.target.value = ""; // Clear input field
    }
  };

  const removeSinger = (item) => {
    const updatedList = singerList.filter((singer) => singer !== item);
    setSingerList(updatedList);
    setValue("singers", updatedList, { shouldValidate: true });
    // trigger("singers");
  };

  const submitHandler = async (data) => {
    console.log("data", data);

    // Create a FormData object and append each field
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("lyricsby", JSON.stringify(data.lyricsby)); // Convert array to JSON string
    formData.append("musicby", JSON.stringify(data.musicby));
    formData.append("singers", JSON.stringify(data.singers));
    formData.append("lyrics", data.lyrics);
    formData.append("miscInfo", data.miscInfo);

    if (data.song) {
      formData.append("song", data.song[0]); // Assuming `data.song` is an array of files
    }

    try {
      await dispatch(uploadSong(formData)).unwrap();
      toast.success("Song Uploaded successfully.");
      reset();
      setSingerList([]);
      setLyricByList([]);
      setMusicByList([]);
      setFileName("");
    } catch (error) {
      console.log("Error in uploading song", error);
      toast.error("Error in uploading song: " + error.message);
    }
  };
  return (
    <>
      {/* <LayoutGrad> */}
      {/* <ModelLayout> */}
      <div className="container">
        <div className="container image-container text-center">
          <div className="image-box w-[60px] h-[60px] mx-auto">
            <img
              src="/music-512-removebg-preview.png"
              className="w-[100%] h-[100%]"
              alt="logo"
            />
          </div>
          <div className="text-2xl font-extrabold title-box">
            <h1 className="flex justify-center items-center">
              {/* <span className="m-3">
                <FaMusic />
              </span> */}
              <span className="m-3">Upload Song</span>{" "}
              {/* <span className="m-3">
                <FaMusic />
              </span> */}
            </h1>
          </div>

          <hr className="w-[80%] mx-auto my-[37px]" />

          <div className="container text-sm">
            <form
              onSubmit={handleSubmit(submitHandler)}
              encType="multipart/form-data"
            >
              <div className="flex w-full flex-wrap mx-auto justify-evenly">
                <div className="flex flex-col items-start m-2 w-[40%]">
                  <label htmlFor="song_name">Song Name*</label>
                  <input
                    type="text"
                    id="song_name"
                    {...register("name", { required: true })}
                    placeholder="Enter Song Name"
                    className="w-full p-2 rounded-md text-black"
                  />
                  {errors.name && (
                    <span className="text-err text-sm">
                      Song Name is required.
                    </span>
                  )}
                </div>
                {/* Author */}
                <div className="flex flex-col items-start m-2 w-[40%]">
                  <label htmlFor="author">Lyrics By</label>
                  <input
                    type="text"
                    id="lyricsby"
                    placeholder="Lyrics by"
                    onBlur={(e) => addLyricBy(e)}
                    className="w-full p-2 rounded-md text-black"
                    onKeyDown={(e) => e.key === "Enter" && addLyricBy(e)} // Add on Enter
                  />

                  <div className="mt-2 flex justify-start items-center flex-wrap">
                    {lyricByList.map((item, index) => (
                      <span
                        key={index}
                        className="bg-galvin-green text-black p-1 mr-2 mb-2 rounded flex items-center"
                      >
                        <span>{item}</span>
                        <button
                          onClick={() => removeLyricBy(item)}
                          className="ml-1 text-red-500"
                        >
                          x
                        </button>
                      </span>
                    ))}
                  </div>
                  {/* Hidden Controller to track lyricsby in form data */}
                  <Controller
                    name="lyricsby"
                    control={control}
                    render={() => null}
                  />
                </div>
                {/* Music by */}
                <div className="flex flex-col items-start m-2 w-[40%]">
                  <label htmlFor="musicby">Music By</label>
                  <input
                    type="text"
                    id="musicby"
                    placeholder="Music by"
                    onBlur={(e) => addMusicBy(e)}
                    className="w-full p-2 rounded-md text-black"
                    onKeyDown={(e) => e.key === "Enter" && addMusicBy(e)} // Add on Enter
                  />

                  <div className="mt-2 flex justify-start items-center flex-wrap">
                    {musicByList.map((item, index) => (
                      <span
                        key={index}
                        className="bg-galvin-green text-black p-1 mr-2 mb-2 rounded flex items-center"
                      >
                        <span>{item}</span>
                        <button
                          onClick={() => removeMusicBy(item)}
                          className="ml-1 text-red-500"
                        >
                          x
                        </button>
                      </span>
                    ))}
                  </div>
                  {/* Hidden Controller to track lyricsby in form data */}
                  <Controller
                    name="musicby"
                    control={control}
                    render={() => null}
                  />
                </div>
                {/* Singer's NOTE: MUST BE ARRAY */}
                <div className="flex flex-col items-start m-2 w-[40%]">
                  <label htmlFor="singers">Singer(s)*</label>
                  <input
                    type="text"
                    id="singers"
                    placeholder="Add list of singers"
                    className="w-full p-2 rounded-md text-black"
                    onBlur={(e) => addSinger(e)}
                    onKeyDown={(e) => e.key === "Enter" && addSinger(e)} // Add on Enter
                  />

                  <div className="mt-2 flex justify-start items-center flex-wrap">
                    {singerList.map((item, index) => (
                      <span
                        key={index}
                        className="bg-galvin-green text-black p-1 mr-2 mb-2 rounded flex items-center"
                      >
                        <span>{item}</span>
                        <button
                          onClick={() => removeSinger(item)}
                          className="ml-1 text-red-500"
                        >
                          x
                        </button>
                      </span>
                    ))}
                  </div>
                  {/* Hidden Controller to track lyricsby in form data */}
                  <Controller
                    name="singers"
                    control={control}
                    rules={{
                      validate: () =>
                        singerList.length > 0 ||
                        "Please add at least one singer",
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        {error && (
                          <span className="text-red-500 mt-1">
                            {error.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
                {/* Album or playlist */}
                <div className="flex flex-col items-start m-2 w-[40%]">
                  <label>Create Under*</label>

                  <div className="flex items-center mt-2">
                    <label className="mr-4">
                      <input
                        type="radio"
                        name="createUnder"
                        value="album"
                        {...register("createUnder", {
                          required: "Please select either Album or Playlist.",
                          onChange: handleOptionChange, // Calls the onChange handler
                        })}
                        className="mr-2"
                      />
                      Album
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="createUnder"
                        value="playlist"
                        {...register("createUnder", {
                          required: "Please select either Album or Playlist.",
                          onChange: handleOptionChange, // Calls the onChange handler
                        })}
                        className="mr-2"
                      />
                      Playlist
                    </label>
                  </div>

                  {errors.createUnder && (
                    <span className="text-err text-sm">
                      {errors.createUnder.message}
                    </span>
                  )}
                </div>
                {/* Select from Album or playlist */}
                {selectedOption && selectedOption === "album" ? (
                  <div className="flex flex-col items-start m-2 w-[40%]">
                    <label htmlFor="albumSelect">Select from Album*</label>

                    <select
                      id="albumSelect"
                      {...register("album", {
                        required: "Please select an album.",
                        onChange: handleAlbumChange, // Calls the onChange handler
                      })}
                      className="p-2 rounded-md text-black w-full"
                      defaultValue="" // Placeholder option
                    >
                      <option value="" disabled>
                        -- Select an Album --
                      </option>
                      {albums.map((album, index) => (
                        <option key={index} value={album}>
                          {album}
                        </option>
                      ))}
                    </select>

                    {errors.album && (
                      <span className="text-err text-sm">
                        {errors.album.message}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-start m-2 w-[40%]">
                    <label htmlFor="playlistSelect">
                      Select from Playlist*
                    </label>

                    <select
                      id="playlistSelect"
                      {...register("playlist", {
                        required: "Please select an Playlist.",
                        onChange: handlePlaylistChange, // Calls the onChange handler
                      })}
                      className="p-2 rounded-md text-black w-full"
                      defaultValue="" // Placeholder option
                    >
                      <option value="" disabled>
                        -- Select an Playlist --
                      </option>
                      {playlists.map((playlist, index) => (
                        <option key={index} value={playlist}>
                          {playlist}
                        </option>
                      ))}
                    </select>

                    {errors.playlist && (
                      <span className="text-err text-sm">
                        {errors.playlist.message}
                      </span>
                    )}
                  </div>
                )}

                {/* Lyrics */}
                <div className="flex flex-col items-start m-2 w-[40%]">
                  <label htmlFor="lyrics">Lyrics</label>
                  <textarea
                    id="lyrics"
                    {...register("lyrics")}
                    placeholder="Lyrics"
                    className="w-full p-2 rounded-md  text-black min-h-[120px]"
                  ></textarea>
                </div>
                {/* Misc Info */}
                <div className="flex flex-col items-start m-2 w-[40%]">
                  <label htmlFor="miscInfo">Other Information(if any)</label>
                  <textarea
                    id="miscInfo"
                    {...register("miscInfo")}
                    placeholder="Any other information"
                    className="w-full p-2 rounded-md  text-black min-h-[120px]"
                  ></textarea>
                </div>
                <div className="flex flex-col items-start m-2 w-[40%]">
                  {/* Song Upload */}
                  <Controller
                    name="song"
                    control={control}
                    rules={{ required: "Please select a song file" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <label
                          htmlFor="file-upload"
                          className="bg-galvin-grey text-white w-full  p-2 rounded-md cursor-pointer hover:bg-gray-700"
                        >
                          {fileName
                            ? `Selected: ${fileName}`
                            : "Choose a song to upload*"}
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          accept="audio/*"
                          className="hidden"
                          onChange={(e) => {
                            handleFileChange(e);
                            field.onChange(e.target.files); // Update field value directly
                          }}
                        />
                        {error && (
                          <span className="text-red-500 mt-1">
                            {error.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>

                <button
                  className="bg-galvin-green w-[60%] p-2 m-2 text-black font-extrabold border-0 border-white border-solid rounded-full"
                  type="submit"
                >
                  {status === "loading" ? <LoadingButton /> : "Upload"}
                </button>
                {/* <div className="text-[#575656] m-7"> */}
                <NavLink
                  to={"/"}
                  className="bg-galvin-grey w-[60%] p-2 m-2 text-white font-extrabold border-0 border-white border-solid rounded-full"
                >
                  Cancel
                </NavLink>
                {/* </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* </ModelLayout> */}
      {/* </LayoutGrad> */}
    </>
  );
};

export default UploadSong;
