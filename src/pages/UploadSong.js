import { NavLink } from "react-router-dom";
import ModelLayout from "../ui/ModelLayout";
import LayoutGrad from "../ui/LayoutGrad";
import { FaMusic } from "react-icons/fa6";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { uploadSong } from "../store/thunk/authThunk";
import { toast } from "react-toastify";
import LoadingButton from "../ui/LoadingButton";

const UploadSong = () => {
  const [fileName, setFileName] = useState("");
  const dispatch = useDispatch();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  // } = useForm();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    trigger,
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
      <LayoutGrad>
        <ModelLayout>
          <div className="container">
            <div className="container image-container text-center">
              <div className="image-box w-[60px] h-[60px] mx-auto">
                <img
                  src="/music-512-removebg-preview.png"
                  className="w-[100%] h-[100%]"
                  alt="logo"
                />
              </div>
              <div className="text-3xl font-extrabold title-box">
                <h1 className="flex justify-center items-center">
                  <span className="m-3">
                    <FaMusic />
                  </span>
                  <span className="m-3">Upload Song</span>{" "}
                  <span className="m-3">
                    <FaMusic />
                  </span>
                </h1>
              </div>

              <hr className="w-[80%] mx-auto my-[37px]" />

              <div className="container">
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  encType="multipart/form-data"
                >
                  <div className="flex flex-col w-[50%] mx-auto">
                    <div className="flex flex-col items-start m-2 w-full">
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
                    <div className="flex flex-col items-start m-2 w-full">
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
                    <div className="flex flex-col items-start m-2 w-full">
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
                    <div className="flex flex-col items-start m-2 w-full">
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
                    {/* Lyrics */}
                    <div className="flex flex-col items-start m-2 w-full">
                      <label htmlFor="lyrics">Lyrics</label>
                      <textarea
                        id="lyrics"
                        {...register("lyrics", { required: true })}
                        placeholder="Lyrics"
                        className="w-full p-2 rounded-md  text-black"
                      ></textarea>
                    </div>
                    {/* Misc Info */}
                    <div className="flex flex-col items-start m-2 w-full">
                      <label htmlFor="miscInfo">
                        Other Information(if any)
                      </label>
                      <textarea
                        id="miscInfo"
                        {...register("miscInfo")}
                        placeholder="Any other information"
                        className="w-full p-2 rounded-md  text-black"
                      ></textarea>
                    </div>
                    <div className="flex flex-col items-start m-2 w-full">
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
                      className="bg-galvin-green w-full p-2 m-2 text-black font-extrabold border-0 border-white border-solid rounded-full"
                      type="submit"
                    >
                      {status === "loading" ? <LoadingButton /> : "Upload"}
                    </button>
                    {/* <div className="text-[#575656] m-7"> */}
                    <NavLink
                      to={"/"}
                      className="bg-galvin-grey w-full p-2 m-2 text-white font-extrabold border-0 border-white border-solid rounded-full"
                    >
                      Cancel
                    </NavLink>
                    {/* </div> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ModelLayout>
      </LayoutGrad>
    </>
  );
};

export default UploadSong;
